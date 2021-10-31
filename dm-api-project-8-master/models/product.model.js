const sql = require("./db.js");

// Product constructor
const Product = function (product) {
  this.Id = product.Id;
  this.Title = product.Title;
  this.Description = product.Description;
  this.Price = product.Price;
  this.Image = product.Image;
  this.IsSold = product.IsSold;
  this.userId = product.userId;
  this.categoryId = product.categoryId;
};

// Get all products
Product.getAll = (result) => {
  sql.query("SELECT * FROM Products", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

// Get all unsold products
Product.getAllUnsold = (result) => {
  sql.query(
    "SELECT * FROM Products WHERE IsSold = 0 ORDER BY Id DESC",
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      console.log("Products: ", res);
      result(null, res);
    }
  );
};

// Get product by id
Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM Products WHERE Id = ${productId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Product with the id not found
    result({ kind: "not_found" }, null);
  });
};

// Get products by userId
Product.findByUserId = (product, result) => {
  sql.query(
    `SELECT * FROM Products WHERE userId = ${product.userId} ORDER BY Id DESC`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Products: ", res);
      result(null, res);
    }
  );
};

// Get unsold products by userId
Product.findByUserIdUnsold = (product, result) => {
  sql.query(
    `SELECT * FROM Products WHERE IsSold = 0 AND userId = ${product.userId} ORDER BY Id DESC`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log("Products: ", res);
      result(null, res);
    }
  );
};

// Get product by title
Product.findByTitle = (product, result) => {
  const query = `SELECT * FROM Products WHERE Title = "${product.Title}"`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(res);

    if (res.length) {
      console.log("Product found: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Product with the title not found
    result({ kind: "not_found" }, null);
  });
};

// Create product
Product.create = (newProduct, result) => {
  sql.query("INSERT INTO Products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created product: ", { Id: res.insertId, ...newProduct });
    result(null, { Id: res.insertId, ...newProduct });
  });
};

// Update product
Product.updateById = (productId, product, result) => {
  sql.query(
    "UPDATE Products SET Title = ?, Price = ?, Description = ?, Image = ?, IsSold = ?, userId = ?, categoryId = ? WHERE Id = ?",
    [
      product.Title,
      product.Price,
      product.Description,
      product.Image,
      product.IsSold,
      product.userId,
      product.categoryId,
      productId,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Product with the id not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated product: ", { productId: productId, ...product });
      result(null, { productId: productId, ...product });
    }
  );
};

// Delete product
Product.remove = (productId, result) => {
  sql.query("DELETE FROM Products WHERE Id = ?", productId, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    // Product with the id not found
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted product id: ", productId);
    result(null, res);
  });
};

module.exports = Product;
