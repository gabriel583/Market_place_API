const sql = require("./db.js");

// User constructor
const User = function (user) {
  this.Id = user.Id;
  this.Username = user.Username;
  this.Password = user.Password;
  this.Name = user.Name;
  this.Email = user.Email;
  this.Phone = user.Phone;
  this.Avatar = user.Avatar;
};

// Get all users
User.getAll = (result) => {
  sql.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

// Get user by id
User.findById = (userId, result) => {
  sql.query(`SELECT * FROM Users WHERE Id = ${userId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // User with the id not found
    result({ kind: "not_found" }, null);
  });
};

// Get all products by user
User.getAllProducts = (userId, result) => {
  sql.query(`SELECT * FROM Products WHERE UserId = ${userId}`, (err, res) => {
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

    // Products with the user id not found
    result({ kind: "not_found" }, null);
  });
};

// Get all unsold products by user
User.getAllUnsoldProducts = (userId, result) => {
  sql.query(
    `SELECT * FROM Products WHERE UserId = ${userId} AND IsSold = 0`,
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

      // Products with the user id not found
      result({ kind: "not_found" }, null);
    }
  );
};

// Verify sign in
User.signIn = (userCredetials, result) => {
  const query = `SELECT * FROM Users WHERE Username = "${userCredetials.Username}" AND Password = "${userCredetials.Password}"`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(res);

    if (res.length) {
      console.log("User match found");
      result(null, res[0]);
      return;
    }

    // User and password unmatched
    result({ kind: "not_found" }, null);
  });
};

// Create user
User.create = (newUser, result) => {
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created user: ", { Id: res.insertId, ...newUser });
    result(null, { Id: res.insertId, ...newUser });
  });
};

// Update user
User.updateById = (userId, user, result) => {
  sql.query(
    "UPDATE Users SET Password = ?, Name = ?, Email = ?, Phone = ?, Avatar = ? WHERE Id = ?",
    [user.Password, user.Name, user.Email, user.Phone, user.Avatar, userId],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      // User with the id not found
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated user: ", { userId: userId, ...user });
      result(null, { userId: userId, ...user });
    }
  );
};

// Delete user
User.remove = (userId, result) => {
  sql.query("DELETE FROM Users WHERE Id = ?", userId, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted user id: ", userId);
    result(null, res);
  });
};

module.exports = User;
