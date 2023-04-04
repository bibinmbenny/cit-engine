module.exports = app => {
  const incidents = require("../controllers/incident.controller.js");

  var router = require("express").Router();

  // Create a new Incident
  router.post("/", incidents.create);

  // Retrieve all Incidents
  router.get("/", incidents.findAll);

  // Retrieve all published Incidents
  router.get("/published", incidents.findAllPublished);

  // Retrieve a single Incident with id
  router.get("/:id", incidents.findOne);

  // Update a Incident with id
  router.put("/:id", incidents.update);

  // Delete a Incident with id
  router.delete("/:id", incidents.delete);

  // Create a new Incident
  router.delete("/", incidents.deleteAll);

  app.use("/api/incidents", router);
};
