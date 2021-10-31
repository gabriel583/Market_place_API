const Product = require("../models/product.model.js");

// Retrieve all products from the database
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all unsold products from the database
exports.findAllUnsold = (req, res) => {
  Product.getAllUnsold((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving unsold products.",
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single product with an id
exports.findOne = (req, res) => {
  Product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.productId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.productId,
        });
      }
    } else res.send(data);
  });
};

// Find Product by user ID
exports.findByUserId = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  // Create a product
  const product = new Product({
    userId: req.body.userId,
  });

  // Verify data
  Product.findByUserId(product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product not found with this credentials`,
        });
      } else {
        res.status(500).send({
          message: "Some error occurred while signing in the Product.",
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Find Product by user ID
exports.findByUserIdUnsold = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  // Create a product
  const product = new Product({
    userId: req.body.userId,
  });

  // Verify data
  Product.findByUserIdUnsold(product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product not found with this credentials`,
        });
      } else {
        res.status(500).send({
          message: "Some error occurred while signing in the Product.",
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Find a single product with a title
exports.findByTitle = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  // Create a product
  const product = new Product({
    Title: req.body.Title,
  });

  // Verify data
  Product.findByTitle(product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product not found with this credentials`,
        });
      } else {
        res.status(500).send({
          message: "Some error occurred while signing in the Product.",
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Create and save a new product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  // Create a product
  const product = new Product({
    Title: req.body.Title,
    Description: req.body.Description,
    Price: req.body.Price,
    Image: req.body.Image,
    IsSold: 0, // IsSold: req.body.IsSold,
    userId: req.body.userId,
    categoryId: req.body.categoryId,
  });

  // Save product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    else res.send(data);
  });
};

// Update a product identified by id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  Product.updateById(
    req.params.productId,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with id ${req.params.productId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating product with id " + req.params.productId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.productId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could't delete product with id " + req.params.productId,
        });
      }
    } else res.send({ message: `Product deleted successfully!` });
  });
};
