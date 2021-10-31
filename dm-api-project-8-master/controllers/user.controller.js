const User = require("../models/user.model.js");

// Retrieve all users from the database
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Retrieve all products that the user has listed
exports.getAllProducts = (req, res) => {
  User.getAllProducts(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Products not found from user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving products from user with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Retrieve all products that the user is selling
exports.getAllUnsoldProducts = (req, res) => {
  User.getAllUnsoldProducts(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Products not found from user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving products from user with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Sign into the app
exports.signIn = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  // Create an user sign in
  const user = new User({
    Username: req.body.Username,
    Password: req.body.Password,
  });

  // Verify data
  User.signIn(user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with this credentials`,
        });
      } else {
        res.status(500).send({
          message: "Some error occurred while signing in the user.",
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Create and save an user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  // Create an user
  const user = new User({
    Username: req.body.Username,
    Password: req.body.Password,
    Name: req.body.Name,
    Description: req.body.Description,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Avatar: req.body.Avatar,
  });

  // Save user in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    else res.send(data);
  });
};

// Update an user identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating user with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

// Delete an user with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Couldn't delete user with id " + req.params.userId,
        });
      }
    } else res.send({ message: `User deleted successfully!` });
  });
};
