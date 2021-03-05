var mysql = require("mysql2");
require('dotenv').config()

const MASKS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS masks ( 
  hash VARCHAR(255) NOT NULL PRIMARY KEY, 
  mask TEXT NOT NULL, 
  datetime DATETIME NOT NULL);`;

const USERS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS users ( 
  email VARCHAR(255) NOT NULL PRIMARY KEY, 
  username VARCHAR(255) NOT NULL PRIMARY KEY, 
  password VARCHAR(255) NOT NULL, 
  companycode VARCHAR(255));`;

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
          if (err) throw err;
          //console.log(results);
          //console.log(err);
          //console.log(fields)
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
  const insert_statement = 'INSERT INTO masks (hash, mask, datetime) VALUES (?, NOW())';
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
    const insert_statement = 'INSERT INTO users (email, username, password, companycode) VALUES (?)';
    values = [user.email, user.username, user.password, user.companyCode];
    //Insert values
    connection.query(insert_statement, [values], function (err, result) {
      if (err) reject(err);
      console.log("Number of records inserted: " + result.affectedRows);
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
    const select_statement = 'SELECT * FROM users WHERE email = ?';
    //Select values
    connection.query(select_statement, [user.email],
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
 * Get users by identifier from the database.
 * @param  {object} identifier email or username 
 * @returns {Array} users
 */
exports.getUsers = function (identifier) {
  return new Promise((resolve, reject) => {
    const select_statement = 'SELECT * FROM users WHERE email = ? OR username = ?';
    //Select values
    connection.query(select_statement, [identifier, identifier],
      function (err, result, fields) {
        if (err) reject(err);
        //If row with the given email exists in the database
        resolve(result);
      });
  });
}

/**
 * Closes connection to the database server.
 */
exports.close = function () {
  connection.end();
}