const sql = require("./db.js");

// Category constructor
const Category = function (category) {
  this.Id = category.Id;
  this.Name = category.Name;
  this.Image = category.Image;
};

// Get all categories
Category.getAll = (result) => {
  sql.query("SELECT * FROM Category ORDER BY Name", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    console.log("Categories: ", res);
    result(null, res);
  });
};

// Get category by id
Category.findById = (categoryId, result) => {
  sql.query(`SELECT * FROM Category WHERE Id = ${categoryId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found category: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Category with the id not found
    result({ kind: "not_found" }, null);
  });
};

// Get all unsold products by category
Category.getAllProducts = (categoryId, result) => {
  sql.query(
    `SELECT * FROM Products WHERE CategoryId = ${categoryId} AND IsSold = 0`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Found products: ", res);
        result(null, res);
        return;
      }

      // Products with such category id not found
      result({ kind: "not_found" }, null);
    }
  );
};

// Get category by name
Category.findByName = (category, result) => {
  const query = `SELECT * FROM Category WHERE Name = "${category.Name}"`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(res);

    if (res.length) {
      console.log("Category found");
      result(null, res[0]);
      return;
    }

    // // Category with the name not found
    result({ kind: "not_found" }, null);
  });
};

// Create category
Category.create = (newCategory, result) => {
  sql.query("INSERT INTO Category SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created category: ", { Id: res.insertId, ...newCategory });
    result(null, { Id: res.insertId, ...newCategory });
  });
};

// Update category
Category.updateById = (categoryId, category, result) => {
  sql.query(
    "UPDATE Category SET Name = ? WHERE Id = ?",
    [category.Name, categoryId],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      // Category with the id not found
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated category: ", {
        categoryId: categoryId,
        ...category,
      });
      result(null, { categoryId: categoryId, ...category });
    }
  );
};

// Delete category
Category.remove = (categoryId, result) => {
  sql.query("DELETE FROM Category WHERE Id = ?", categoryId, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    // Category with the id not found
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted category with id: ", categoryId);
    result(null, res);
  });
};

module.exports = Category;
