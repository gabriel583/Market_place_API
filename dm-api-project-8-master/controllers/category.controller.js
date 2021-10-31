const Category = require("../models/category.model.js");

// Retrieve all categories from the database
exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single category with an id
exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving category with id " + req.params.categoryId,
        });
      }
    } else res.send(data);
  });
};

// Retrieve all products from a certain category
exports.getAllProducts = (req, res) => {
  Category.getAllProducts(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.categoryId,
        });
      }
    } else res.send(data);
  });
};

// Find by name
exports.findByName = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  const category = new Category({
    Name: req.body.Name,
  });

  // Verify data
  Category.findByName(category, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Category not found with such name`,
        });
      } else {
        res.status(500).send({
          message: "Some error occurred while finding the category.",
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Create and save a new category
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  // Create a category
  const category = new Category({
    Name: req.body.Name,
    Image: req.body.Image
  });

  // Save category in the database
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category.",
      });
    else res.send(data);
  });
};

// Update a category identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  Category.updateById(
    req.params.categoryId,
    new Category(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found category with id ${req.params.categoryId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating category with id " + req.params.categoryId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a category with the specified id in the request
exports.delete = (req, res) => {
  Category.remove(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found category with id ${req.params.categoryId}.`,
        });
      } else {
        res.status(500).send({
          message: "Couldn't get category with id " + req.params.categoryId,
        });
      }
    } else res.send({ message: `Category deleted successfully!` });
  });
};
