const mysql = require("mysql2");

const CUSTOMERS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS customers ( 
  hash VARCHAR(255) NOT NULL PRIMARY KEY, 
  customer TEXT NOT NULL, 
  datetime DATETIME NOT NULL);`;

const USERS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS users ( 
  email VARCHAR(255) NOT NULL PRIMARY KEY, 
  username VARCHAR(255) NOT NULL UNIQUE, 
  password VARCHAR(255) NOT NULL, 
  companycode VARCHAR(255),
  role VARCHAR(255),
  blocked BOOLEAN);`;

let connection;

/**
 * Establishes a connection to the database server.
 */
function connect() {
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
    [CUSTOMERS_TABLE_CREATION, USERS_TABLE_CREATION].forEach(query => {
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
 * Stores customer in the database.
 * @param  {string} hash Hash string
 * @param  {object} customer Customer object 
 */
function storeCustomer(hash, customer) {
  const insertStatement = 'INSERT INTO customers (hash, customer, datetime) VALUES (?, NOW());';
  values = [
    [hash, customer]
  ];
  //Insert values
  connection.query(insertStatement, values, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

/**
 * Stores account in the database.
 * @param  {object} account Account object 
 */
function storeAccount(account) {
  const insertStatement = 'INSERT INTO accounts (email, username, password, companycode, role, blocked) VALUES (?);';
  const values = [[account.email, account.username, account.password, account.companyCode, account.role, false]];
  return insertQueryPromise(insertStatement, values);
}

/**
 * Updates account in the database.
 * @param  {object} account Account object 
 */
function updateAccount(account) {
  let updateStatement = `UPDATE accounts SET companycode = ?, blocked = ? WHERE email = ?;`;
  let values = [account.companyCode, account.blocked, account.email];
  //If we change password
  if (account.password) {
    updateStatement = `UPDATE accounts SET password = ?, companycode = ?, blocked = ? WHERE email = ?;`;
    values = [account.password, account.companyCode, account.blocked, account.email];
  }
  return updateQueryPromise(updateStatement, values);
}

/**
 * Deletes account from the database.
 * @param  {object} account Account object 
 */
function deleteAccount(account) {
  const deleteStatement = 'DELETE FROM accounts WHERE email = ?';
  const values = [account.email];
  return deleteQueryPromise(deleteStatement, values);
}

/**
 * Checks if account not exists.
 * @param  {object} account Account object 
 * @returns true if account is not in the database
 */
function isAccountNotExists(account) {
  const selectStatement = 'SELECT * FROM accounts WHERE email = ? OR username = ?';
  const values = [account.email, account.username];
  return selectQueryPromise(selectStatement, values)
    .then(result => new Promise((resolve, reject) => {
      if (Array.isArray(result) && result.length) {
        resolve(false);
      } else {
        resolve(true);
      }
    }));
}

/**
 * Checks if customer with a given hash is in the database.
 * @param {string} hash hashstring from the email message
 */
function checkConfirmation(hash) {
  const selectStatement = 'SELECT customer FROM customers WHERE hash = ?';
  const values = [hash];
  return selectQueryPromise(selectStatement, values)
    .then(result => new Promise((resolve, reject) => {
      if (Array.isArray(result) && result.length) {
        resolve();
      } else {
        reject();
      }
    }));
}

/**
 * Removes old unconfirmed customers.
 */
function removeOldCustomers() {
  const remove_statement = "DELETE FROM customers WHERE datetime < NOW() - INTERVAL ? DAY";
  const values = [process.env.DB_STORAGE_DURATION];
  //Remove all customers, which are older than process.env.DB_STORAGE_DURATION
  return deleteQueryPromise(deleteStatement, values);
}

/**
 * Retrieves account from the database.
 * @param  {object} account Account object 
 */
function getAccount(account) {
  const selectStatement = 'SELECT * FROM accounts WHERE email = ? OR username = ?';
  const values = [account.email, account.username];
  return selectQueryPromise(selectStatement, values)
    .then(result => {
      if (Array.isArray(result) && result.length) {
        return result.map(val => {
          return {
            username: val.username,
            email: val.email,
            companyCode: val.companycode,
            role: val.role,
            blocked: val.blocked,
            password: val.password
          }
        })[0]
      }
      return {
        ...result[0]
      }
    });
}

/**
 * Retrieves all accounts from the database.
 */
function getAccounts() {
  const selectStatement = 'SELECT * FROM accounts;';
  const values = [];
  return selectQueryPromise(selectStatement, values)
    .then(result => result.map(val => {
      return {
        username: val.username,
        email: val.email,
        companyCode: val.companycode,
        role: val.role,
        blocked: val.blocked
      }
    }));
}

/**
 * Closes connection to the database server.
 */
function close() {
  connection.end();
}

module.exports = {
  close,
  getAccounts,
  getAccount,
  removeOldCustomers,
  checkConfirmation,
  isAccountNotExists,
  deleteAccount,
  updateAccount,
  storeAccount,
  storeCustomer,
  connect
};