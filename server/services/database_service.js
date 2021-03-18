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

async function cudQuery(statement, values) {
  try {
    await connection.query(statement, values);
    return true;
  } catch (e) {
    console.error(e.stack);
    return false;
  }
}

async function selectQuery(selectStatement, values) {
  try {
    let result = await connection.query(selectStatement, values);
    return result;
  } catch (e) {
    console.error(e.stack);
    return false;
  }
}

/**
 * Stores customer in the database.
 * @param  {string} hash Hash string
 * @param  {object} customer Customer object 
 */
async function storeCustomer(hash, customer) {
  const insertStatement = 'INSERT INTO customers (hash, customer, datetime) VALUES (?, NOW());';
  values = [
    [hash, customer]
  ];
  await cudQuery(insertStatement, values);
}

/**
 * Stores account in the database.
 * @param  {object} account Account object 
 */
async function storeAccount(account) {
  const insertStatement = 'INSERT INTO accounts (email, username, password, companycode, role, blocked) VALUES (?);';
  const values = [[account.email, account.username, account.password, account.companyCode, account.role, false]];
  await cudQuery(insertStatement, values);
}

/**
 * Stores reset account in the database.
 * @param  {string} hash
 * @param  {string} email  
 */
async function storePasswordReset(hash, email) {
  const insertStatement = 'INSERT INTO passwordresets (hash, email, datetime) VALUES (?, NOW());';
  const values = [[hash, email]];
  await cudQuery(insertStatement, values);
}

/**
 * Updates account in the database.
 * @param  {object} account Account object 
 */
async function updateAccount(account) {
  let updateStatement = `UPDATE accounts SET companycode = ?, blocked = ? WHERE email = ?;`;
  let values = [account.companyCode, account.blocked, account.email];
  //If we change password
  if (account.password) {
    updateStatement = `UPDATE accounts SET password = ?, companycode = ?, blocked = ? WHERE email = ?;`;
    values = [account.password, account.companyCode, account.blocked, account.email];
  }
  await cudQuery(updateStatement, values);
}

/**
 * Deletes account from the database.
 * @param  {object} account Account object 
 */
async function deleteAccount(account) {
  const values = [account.email];
  const deletePasswordResetStatement = 'DELETE FROM passwordresets WHERE email = ?';
  const deleteAccountStatement = 'DELETE FROM accounts WHERE email = ?';
  await cudQuery(deletePasswordResetStatement, values);
  await cudQuery(deleteAccountStatement, values);
}

/**
 * Checks if account not exists.
 * @param  {object} account Account object 
 * @returns true if account is not in the database
 */
async function isAccountNotExists(account) {
  const selectStatement = 'SELECT * FROM accounts WHERE email = ? OR username = ?';
  const values = [account.email, account.username];
  let result = await selectQuery(selectStatement, values);
  if (Array.isArray(result) && result.length) {
    return false;
  } else {
    return true;
  }
}

/**
 * Checks if customer with a given hash is in the database.
 * @param {string} hash hashstring from the email message
 */
async function checkCustomerConfirmation(hash) {
  const selectStatement = 'SELECT * FROM customers WHERE hash = ?';
  const values = [hash];
  let result = await selectQuery(selectStatement, values);
  if (Array.isArray(result) && result.length) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if password reset with a given hash is in the database.
 * @param {string} hash hash string from the email message
 */
async function checkPasswordResetConfirmation(hash) {
  const selectStatement = 'SELECT * FROM passwordresets WHERE hash = ?';
  const values = [hash];
  let result = await selectQuery(selectStatement, values);
  if (Array.isArray(result) && result.length) {
    return result[0].email;
  } else {
    return false;
  }
}

/**
 * Removes old unconfirmed customers.
 */
async function removeOldCustomers() {
  const remove_statement = "DELETE FROM customers WHERE datetime < NOW() - INTERVAL ? DAY";
  const values = [process.env.DB_STORAGE_DURATION];
  //Remove all customers, which are older than process.env.DB_STORAGE_DURATION
  await cudQuery(deleteStatement, values);
}

/**
 * Retrieves account from the database.
 * @param  {object} account Account object 
 */
async function getAccount(account) {
  const selectStatement = 'SELECT * FROM accounts WHERE email = ? OR username = ?';
  const values = [account.email, account.username];
  let result = (await selectQuery(selectStatement, values))[0];
  if (result) {
    return {
      username: result.username,
      email: result.email,
      companyCode: result.companycode,
      role: result.role,
      blocked: result.blocked,
      password: result.password
    };
  } else {
    return false;
  }
}

/**
 * Retrieves all accounts from the database.
 */
async function getAccounts() {
  const selectStatement = 'SELECT * FROM accounts;';
  const values = [];
  let accounts = await selectQuery(selectStatement, values);
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
  storePasswordReset,
  createTables,
  dropTables,
  connect
};