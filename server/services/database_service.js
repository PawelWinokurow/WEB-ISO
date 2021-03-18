const mysql = require("mysql2");
const util = require('util');

const CUSTOMERS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS customers ( 
  hash VARCHAR(255) NOT NULL, 
  customer TEXT NOT NULL, 
  datetime DATETIME NOT NULL,
  PRIMARY KEY (hash));`;

const ACCOUNTS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS accounts ( 
  email VARCHAR(255) NOT NULL, 
  username VARCHAR(255) NOT NULL UNIQUE, 
  password VARCHAR(255) NOT NULL, 
  companycode VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  blocked BOOLEAN NOT NULL,
  PRIMARY KEY (email));`;

const RESETS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS passwordresets (
    hash VARCHAR(255) NOT NULL,
    datetime DATETIME NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (hash),
    FOREIGN KEY (email) REFERENCES accounts(email));`;

let connection = {};

/**
 * Establishes a connection to the database server.
 */
function connect() {
  //Create DB connection
  let pool = mysql.createPool({
    connectionLimit: process.env.DB_NUM_CONNECTIONS,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
  });

  pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
      }
    }
    if (connection) connection.release()
    return
  })
  connection.query = util.promisify(pool.query).bind(pool);
}

async function createTables() {
  const creations = [CUSTOMERS_TABLE_CREATION, ACCOUNTS_TABLE_CREATION, RESETS_TABLE_CREATION]
  for (const q of creations) {
    try {
      await connection.query(q);
    } catch (e) {
      console.error(e.stack);
    }
  }
}

async function dropTables() {
  const drops = ['DROP TABLE passwordresets;', 'DROP TABLE accounts;', 'DROP TABLE customers;'];
  for (const q of drops) {
    try {
      await connection.query(q);
    } catch (e) {
      if (e.code !== 'ER_BAD_TABLE_ERROR') {
        console.error(e.stack);
      }
    }
  }
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
 * Stores reset account in the database.
 * @param  {string} hash
 * @param  {string} email  
 */
function storeResetAccount(hash, email) {
  const insertStatement = 'INSERT INTO resets (hash, email, datetime) VALUES (?, NOW());';
  const values = [[hash, email]];
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
function checkCustomerConfirmation(hash) {
  const selectStatement = 'SELECT * FROM customers WHERE hash = ?';
  const values = [hash];
  return selectQueryPromise(selectStatement, values)
    .then(result => new Promise((resolve, reject) => {
      if (Array.isArray(result) && result.length) {
        resolve(true);
      } else {
        reject(false);
      }
    }));
}

/**
 * Checks if password reset with a given hash is in the database.
 * @param {string} hash hash string from the email message
 */
function checkPasswordResetConfirmation(hash) {
  const selectStatement = 'SELECT * FROM resets WHERE hash = ?';
  const values = [hash];
  return selectQueryPromise(selectStatement, values)
    .then(result => new Promise((resolve, reject) => {
      if (Array.isArray(result) && result.length) {
        resolve(result[0].email);
      } else {
        reject(false);
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
async function getAccount(account) {
  try {
    const selectStatement = 'SELECT * FROM accounts WHERE email = ? OR username = ?';
    const values = [account.email, account.username];
    let result = (await selectQueryPromise(selectStatement, values))[0];
    if (result) {
      const account = {
        username: result.username,
        email: result.email,
        companyCode: result.companycode,
        role: result.role,
        blocked: result.blocked,
        password: result.password
      }
      return account;
    }
    return result;
  } catch (e) {
    console.error(e.stack);
  }
}


/**
 * Retrieves all accounts from the database.
 */
async function getAccounts() {
  try {
    const selectStatement = 'SELECT * FROM accounts;';
    const values = [];
    let accounts = await selectQueryPromise(selectStatement, values);
    accounts = accounts.map(val => {
      return {
        username: val.username,
        email: val.email,
        companyCode: val.companycode,
        role: val.role,
        blocked: val.blocked
      }
    });
    return accounts;
  } catch (e) {
    console.error(e.stack);
  }
}

module.exports = {
  getAccounts,
  getAccount,
  removeOldCustomers,
  checkCustomerConfirmation,
  checkPasswordResetConfirmation,
  isAccountNotExists,
  deleteAccount,
  updateAccount,
  storeAccount,
  storeCustomer,
  storeResetAccount,
  createTables,
  dropTables,
  connect
};