const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.incidents = require("./incident.model.js")(mongoose);
db.empl = require("./emp.model.js")(mongoose);
module.exports = db;
