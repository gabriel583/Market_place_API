var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller.js");

// Get all users
router.get("/", function (req, res, next) {
  userController.findAll(req, res);
});

// Get a single user by id
router.get("/:userId", function (req, res, next) {
  userController.findOne(req, res);
});

// Get all products by user
router.get("/products/:userId", function (req, res, next) {
  userController.getAllProducts(req, res);
});

// Get all unsold products by user
router.get("/unsoldProducts/:userId", function (req, res, next) {
  userController.getAllUnsoldProducts(req, res);
});

// Verify sign in for username and password
router.post("/signIn", function (req, res, next) {
  userController.signIn(req, res);
});

// Create new user
router.post("/", function (req, res, next) {
  userController.create(req, res);
});

// Update an user
router.put("/:userId", function (req, res, next) {
  userController.update(req, res);
});

// Delete an user
router.delete("/:userId", function (req, res, next) {
  userController.delete(req, res);
});

module.exports = router;
