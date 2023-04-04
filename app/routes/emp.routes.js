module.exports = app => {
    const empl = require("../controllers/emp.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Employee
    router.post("/", empl.create);
  
    // Retrieve all Employees
    router.get("/", empl.findAll);
  
    // Retrieve all published Employees
    router.get("/published", empl.findAllPublished);
  
    // Retrieve a single Employee with id
    router.get("/:id", empl.findOne);
  
    // Update a Employee with id
    router.put("/:id", empl.update);
  
    // Delete a Employee with id
    router.delete("/:id", empl.delete);
  
    // Create a new Employee
    router.delete("/", empl.deleteAll);
  
    app.use("/api/empl", router);
  };
  