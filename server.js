const express = require("express");
const cors = require("cors");
const prometheus = require("prom-client");
const client = require("prom-client");
//import { register } from "prom-client";
const promBundle = require("express-prom-bundle");
const axios = require('axios');
const prometheusUrl = 'http://54.169.96.169:9090';
const query = 'ALERTS';
const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://citpoc-db:cL37gGRUYp2Ixqosg95mITf5UF104lYaBv4yk6eX5kkuWYq6zZAn6lTAsJ1SuEgUij6YlbC6Rk8xACDb2uvXUA==@citpoc-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@citpoc-db@/test';
const mongoClient = new MongoClient(mongoUrl, { useUnifiedTopology: true });



const app = express();


var corsOptions = {
  origin: "https://citengin.azurewebsites.net"
};

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {},
    register: new client.Registry(),
  },
});


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(metricsMiddleware);

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
//app.get("/", (req, res) => {
//  res.json({ message: "Welcome to CIT application." });
//});

// Create counters for total and failed API calls
const totalApiCallsCounter = new prometheus.Counter({
  name: 'my_app_total_api_calls',
  help: 'Total number of API calls',
});
const failedApiCallsCounter = new prometheus.Counter({
  name: 'my_app_failed_api_calls',
  help: 'Number of failed API calls',
});

// Middleware to increment total and failed API call counters
app.use((req, res, next) => {
  totalApiCallsCounter.inc();

  res.on('finish', () => {
    if (res.statusCode >= 400) {
      failedApiCallsCounter.inc();
    }
  });

  next();
});

// Expose metrics
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  prometheus.register.metrics().then(metrics => {
    res.end(metrics.toString()); // <-- convert to string
  }).catch(err => {
    console.error(err);
    res.status(500).end();
  });
});

let lastRetrievedTime = null;

async function main() {
  try {
    // Connect to MongoDB
    await mongoClient.connect();
    const db = mongoClient.db();
    const alertsCollection = db.collection('issuedetails');

    // Retrieve data from Prometheus
    const response = await axios.get(`${prometheusUrl}/api/v1/query`, {
      params: { query },
    });

    const data = response.data;
    await alertsCollection.createIndex({ ID: 1 });

    // Only save data with a timestamp greater than the last retrieved time
    const newAlerts = data.data.result.filter(alert => alert.value[0] > lastRetrievedTime);
    const lastAlert = await alertsCollection.findOne({}, { sort: { ID: -1 } });
    let index = lastAlert ? lastAlert.ID + 1 : 1;

    const existingAlerts = await alertsCollection.find({ ID: { $exists: true } }).toArray();
    if (existingAlerts.length > 0 && !existingAlerts.every(alert => alert.hasOwnProperty('ID'))) {
    console.error('Some existing documents in the collection do not have the ID field');
    process.exit(1);
    }
    //const newAlerts = data.data.result.filter(alert => alert.value[0] > lastRetrievedTime);
    if (newAlerts.length > 0) {
      //let index = 51;
      // Map newAlerts array to match the schema of the issuedetails collection
      const alertsToInsert = newAlerts.map(alert => ({
        ID: index++,
        Incident_Name: alert.metric.alertname,
        Description: alert.metric.description,
        Created_Date: new Date(alert.value[0] * 1000),
        Priority: alert.metric.severity,
        reason: alert.metric.summary,
        Assigned_to: "Unassigned"	
        // add more fields as needed
      }));

      const newAlertIds = alertsToInsert.map(alert => alert.ID);
      if (existingAlerts.some(alert => newAlertIds.includes(alert.ID))) {
      console.error('Some new alerts have the same ID as existing documents in the collection');
      process.exit(1);
      }

      // Insert new documents into the issuedetails collection
      await alertsCollection.insertMany(alertsToInsert);
      console.log(`Saved ${newAlerts.length} new alerts to MongoDB`);
      
      // Create a unique index on the _id field to auto-increment the ID
      await alertsCollection.createIndex({ ID: 1 }, { name: "ID_index" });

      // Update the last retrieved time
      lastRetrievedTime = Date.now();
    } else {
      console.log('No new alerts to save to MongoDB');
    }

    // Disconnect from MongoDB
    await mongoClient.close();
  } catch (err) {
    console.error(err);
  }
}



main();

require("./app/routes/incident.routes")(app);
require("./app/routes/emp.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});