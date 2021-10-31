var express = require("express");
var router = express.Router();
const productController = require("../controllers/product.controller.js");

// Get all products
router.get("/", function (req, res, next) {
  productController.findAll(req, res);
});

// Get all unsold products
router.get("/unsold", function (req, res, next) {
  productController.findAllUnsold(req, res);
});

// Get a single product by id
router.post("/:productId", function (req, res, next) {
  productController.findOne(req, res);
});

// Get a single product by title
router.post("/productTitle/title", function (req, res, next) {
  productController.findByTitle(req, res);
});

// Get products by userId
router.post("/productUser/id", function (req, res, next) {
  productController.findByUserId(req, res);
});

// Get unsold products by userId
router.post("/unsoldProductUser/id", function (req, res, next) {
  productController.findByUserIdUnsold(req, res);
});

// Create a new product
router.post("/", function (req, res, next) {
  productController.create(req, res);
});

// Update a product
router.put("/:productId", function (req, res, next) {
  productController.update(req, res);
});

// Delete a product
router.delete("/:productId", function (req, res, next) {
  productController.delete(req, res);
});

module.exports = router;
