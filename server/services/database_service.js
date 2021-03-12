var mysql = require("mysql2");
require('dotenv').config()

const MASKS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS masks ( 
  hash VARCHAR(255) NOT NULL PRIMARY KEY, 
  mask TEXT NOT NULL, 
  datetime DATETIME NOT NULL);`;

const USERS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS users ( 
  email VARCHAR(255) NOT NULL PRIMARY KEY, 
  username VARCHAR(255) NOT NULL UNIQUE, 
  password VARCHAR(255) NOT NULL, 
  companycode VARCHAR(255),
  role VARCHAR(255),
  blocked BOOLEAN);`;

var connection;

/**
 * Establishes a connection to the database server.
 */
exports.connect = function () {
  //Create DB connection
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });
  //Connect to database
  connection.connect(function (err) {
    if (err) throw err;
    [MASKS_TABLE_CREATION, USERS_TABLE_CREATION].forEach(query => {
      //Create table if table not exists
      connection.query(query,
        function (err, results, fields) {
          if (err) {
            console.log(err);
            throw err;
          } 
          console.log(results);
        });
    });
    return connection;
  });
}

/**
 * Stores customer mask in the database.
 * @param  {string} hash Hash string
 * @param  {object} mask Mask object 
 */
exports.storeMask = function (hash, mask) {
  var stringJson = JSON.stringify(mask);
  const insert_statement = 'INSERT INTO masks (hash, mask, datetime) VALUES (?, NOW());';
  values = [hash, stringJson];
  //Insert values
  connection.query(insert_statement, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

/**
 * Stores user in the database.
 * @param  {object} user User object 
 */
exports.storeUser = function (user) {
  return new Promise((resolve, reject) => {
    const insert_statement = 'INSERT INTO users (email, username, password, companycode, role, blocked) VALUES (?);';
    values = [user.email, user.username, user.password, user.companyCode, user.role, false];
    //Insert values
    connection.query(insert_statement, [values], function (err, result) {
      if (err) reject(err);
      console.log("Number of records inserted: " + result.affectedRows);
      resolve(true);
    });
  });
}

/**
 * Updates user in the database.
 * @param  {object} user User object 
 */
 exports.updateUser = function (user) {
  return new Promise((resolve, reject) => {
    const update_statement = `UPDATE users SET password = '${user.password}', companycode = '${user.companyCode}' WHERE email = '${user.email}';`;
    //Insert values
    connection.query(update_statement, function (err, result) {
      if (err) {
        console.log(err)
        reject(err);
      }
      console.log("Number of records updated: " + result.affectedRows);
      resolve(true);
    });
  });
}

/**
 * Deletes user from the database.
 * @param  {object} user User object 
 */
 exports.deleteUser = function (user) {
  return new Promise((resolve, reject) => {
    const delete_statement = 'DELETE FROM users WHERE email = ?';
    values = [user.email];
    //Insert values
    connection.query(delete_statement, [values], function (err, result) {
      if (err) reject(err);
      console.log("Number of records removed: " + result.affectedRows);
      resolve(true);
    });
  });
}

/**
 * Checks if user not is in the database.
 * @param  {object} user User object 
 * @returns true if user is not in the database
 */
exports.checkUser = function (user) {
  return new Promise((resolve, reject) => {
    const select_statement = 'SELECT * FROM users WHERE email = ? OR username = ?';
    //Select values
    connection.query(select_statement, [user.email, user.username],
      function (err, result, fields) {
        if (err) reject(err);
        //If row with the given email exists in the database
        if (Array.isArray(result) && result.length) {
          reject(false);
        } else {
          resolve(true);
        }
      });
  });
}

/**
 * Checks if customer mask with a given hash is in the database.
 * @param {string} hash hashstring from the email message
 */
exports.checkConfirmation = function (hash) {
  return new Promise((resolve, reject) => {
    const select_statement = 'SELECT mask FROM masks WHERE hash = ?';
    //Select values
    connection.query(select_statement, [hash],
      function (err, result, fields) {
        if (err) reject(err);
        //If row with the given hash exists in the database
        if (Array.isArray(result) && result.length) {
          resolve(result[0]);
        } else {
          reject(result);
        }
      });
  });
}

/**
 * Removes old customer masks.
 */
exports.removeOldMasks = function () {
  const remove_statement = "DELETE FROM masks WHERE datetime < NOW() - INTERVAL ? DAY";
  //Remove all customer masks, which are older than process.env.DB_STORAGE_DURATION
  connection.query(remove_statement, [process.env.DB_STORAGE_DURATION], function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
}

/**
 * Retrieves user from the database.
 * @param  {object} user User object 
 */
 exports.getUser = function (user) {
  return new Promise((resolve, reject) => {
    const select_statement = 'SELECT * FROM users WHERE email = ? OR username = ?';
    //Select values
    connection.query(select_statement, [user.email, user.username],
      function (err, result, fields) {
        if (err) reject(err);
        if (Array.isArray(result) && result.length) {
          resolve(result[0]);
        } else {
          reject(false);
        }
      });
  });
}

/**
 * Closes connection to the database server.
 */
exports.close = function () {
  connection.end();
}