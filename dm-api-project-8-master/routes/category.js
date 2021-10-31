var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/category.controller.js");

// Get all categories
router.get("/", function (req, res, next) {
  categoryController.findAll(req, res);
});

// Get a single category by id
router.get("/:categoryId", function (req, res, next) {
  categoryController.findOne(req, res);
});

// Get all unsold products from category
router.get("/products/:categoryId", function (req, res, next) {
  categoryController.getAllProducts(req, res);
});

// Get a single category by name
router.post("/categoryName", function (req, res, next) {
  categoryController.findByName(req, res);
});

// Create a new category
router.post("/", function (req, res, next) {
  categoryController.create(req, res);
});

// Update a category
router.put("/:categoryId", function (req, res, next) {
  categoryController.update(req, res);
});

// Delete a category
router.delete("/:categoryId", function (req, res, next) {
  categoryController.delete(req, res);
});

module.exports = router;
