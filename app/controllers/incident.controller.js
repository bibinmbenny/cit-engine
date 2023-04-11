const db = require("../models");
const Incident = db.incidents;

// Create and Save a new Incident
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Incident
  const incident = new Incident({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Incident in the database
  incident
    .save(incident)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Incident."
      });
    });
};

// Retrieve all Incidents from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Incident.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving incidents."
      });
    });
};

// Find a single Incident with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Incident.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Incident with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Incident with id=" + id });
    });
};

// Update a Incident by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Incident.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Incident with id=${id}. Maybe Incident was not found!`
        });
      } else res.send({ message: "Incident was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Incident with id=" + id
      });
    });
};

// Delete a Incident with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Incident.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Incident with id=${id}. Maybe Incident was not found!`
        });
      } else {
        res.send({
          message: "Incident was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Incident with id=" + id
      });
    });
};

// Delete all Incidents from the database.
exports.deleteAll = (req, res) => {
  Incident.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Incidents were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all incidents."
      });
    });
};

// Find all published Incidents
exports.findAllPublished = (req, res) => {
  Incident.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving incidents."
      });
    });
};

