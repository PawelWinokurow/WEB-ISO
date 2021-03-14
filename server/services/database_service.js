const mysql = require("mysql2");

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
          //console.log(results);
        });
    });
    return connection;
  });
}

function insertQueryPromise(insertStatement, values) {
  return new Promise((resolve, reject) => {
    connection.query(insertStatement, values, function (err, result) {
      if (err) reject(err);
      console.log("Number of records inserted: " + result.affectedRows);
      resolve(true);
    })
  });
}

function updateQueryPromise(updateStatement, values) {
  return new Promise((resolve, reject) => {
    connection.query(updateStatement, values, function (err, result) {
      if (err) reject(err);
      console.log("Number of records updated: " + result.affectedRows);
      resolve(true);
    })
  });
}

function deleteQueryPromise(deleteStatement, values) {
  return new Promise((resolve, reject) => {
    connection.query(deleteStatement, values, function (err, result) {
      if (err) reject(err);
      console.log("Number of records removed: " + result.affectedRows);
      resolve(true);
    });
  });
}

function selectQueryPromise(selectStatement, values) {
  return new Promise((resolve, reject) => {
    connection.query(selectStatement, values,
      function (err, result, fields) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

/**
 * Stores customer mask in the database.
 * @param  {string} hash Hash string
 * @param  {object} mask Mask object 
 */
exports.storeMask = function (hash, mask) {
  const insertStatement = 'INSERT INTO masks (hash, mask, datetime) VALUES (?, NOW());';
  values = [[hash, mask]];
  //Insert values
  connection.query(insertStatement, values, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

/**
 * Stores user in the database.
 * @param  {object} user User object 
 */
exports.storeUser = function (user) {
  const insertStatement = 'INSERT INTO users (email, username, password, companycode, role, blocked) VALUES (?);';
  //const values = [[user.email, user.username, user.password, user.companyCode, 'ADMIN', false]];
  const values = [[user.email, user.username, user.password, user.companyCode, 'USER', false]];
  return insertQueryPromise(insertStatement, values);
}

/**
 * Updates user in the database.
 * @param  {object} user User object 
 */
exports.updateUser = function (user) {
  //If we change password
  if (user.password) {
    var updateStatement = `UPDATE users SET password = ?, companycode = ?, blocked = ? WHERE email = ?;`;
    var values = [user.password, user.companyCode, user.blocked, user.email];
  } else {
    var updateStatement = `UPDATE users SET companycode = ?, blocked = ? WHERE email = ?;`;
    var values = [user.companyCode, user.blocked, user.email];
  }
  return updateQueryPromise(updateStatement, values);
}

/**
 * Deletes user from the database.
 * @param  {object} user User object 
 */
exports.deleteUser = function (user) {
  const deleteStatement = 'DELETE FROM users WHERE email = ?';
  const values = [user.email];
  return deleteQueryPromise(deleteStatement, values);
}

/**
 * Checks if user not exists.
 * @param  {object} user User object 
 * @returns true if user is not in the database
 */
exports.isUserNotExists = function (user) {
  const selectStatement = 'SELECT * FROM users WHERE email = ? OR username = ?';
  const values = [user.email, user.username];
  return selectQueryPromise(selectStatement, values)
    .then(result => new Promise((resolve, reject) => {
      if (Array.isArray(result) && result.length) {
        reject();
      } else {
        resolve();
      }
    }));
}

/**
 * Checks if customer mask with a given hash is in the database.
 * @param {string} hash hashstring from the email message
 */
exports.checkConfirmation = function (hash) {
  const selectStatement = 'SELECT mask FROM masks WHERE hash = ?';
  const values = [hash];
  return selectQueryPromise(selectStatement, values);
}

/**
 * Removes old customer masks.
 */
exports.removeOldMasks = function () {
  const remove_statement = "DELETE FROM masks WHERE datetime < NOW() - INTERVAL ? DAY";
  const values = [process.env.DB_STORAGE_DURATION];
  //Remove all customer masks, which are older than process.env.DB_STORAGE_DURATION
  return deleteQueryPromise(deleteStatement, values);
}

/**
 * Retrieves user from the database.
 * @param  {object} user User object 
 */
exports.getUser = function (user) {
  const selectStatement = 'SELECT * FROM users WHERE email = ? OR username = ?';
  const values = [user.email, user.username];
  return selectQueryPromise(selectStatement, values)
  .then(result => {return {...result[0]}});
}

/**
 * Retrieves all users from the database.
 */
exports.getUsers = function () {
  const selectStatement = 'SELECT * FROM users;';
  const values = [];
  return selectQueryPromise(selectStatement, values)
    .then(result => result.map(result => {
      return {
        username: result.username,
        email: result.email,
        companyCode: result.companycode,
        role: result.role,
        blocked: result.blocked
      }
    }));
}

/**
 * Closes connection to the database server.
 */
exports.close = function () {
  connection.end();
}