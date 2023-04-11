const express = require("express");
const cors = require("cors");
//const path = require("path");
const prometheus = require('prom-client');
const { httpRequestCounter } = require('./metrics');
const client = require('prom-client');
const promBundle = require('express-prom-bundle');

const app = express();
//const static_path = path.join(__dirname, "./public" );

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {},
    register: new client.Registry(),
  },
});


//app.use(express.static(static_path));

var corsOptions = {
  origin: "https://citengin.azurewebsites.net"
};

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

require("./app/routes/incident.routes")(app);
require("./app/routes/emp.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

