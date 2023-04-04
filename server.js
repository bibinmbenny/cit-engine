const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const static_path = path.join(__dirname, "./public" );
app.use(express.static(static_path));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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

require("./app/routes/incident.routes")(app);
require("./app/routes/emp.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


