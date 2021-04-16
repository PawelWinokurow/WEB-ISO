const mysql = require("mysql2");
const util = require('util');

const CUSTOMERS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS customers ( 
  hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL, 
  customer TEXT NOT NULL, 
  sapID VARCHAR(255),
  datetime DATETIME NOT NULL,
  PRIMARY KEY (hash),
  FOREIGN KEY (email) REFERENCES accounts(email));`;

const ACCOUNTS_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS accounts ( 
  email VARCHAR(255) NOT NULL, 
  username VARCHAR(255) NOT NULL UNIQUE, 
  password VARCHAR(255) NOT NULL, 
  companycode VARCHAR(255) NOT NULL,
  salutationcode VARCHAR(255),
  firstname VARCHAR(255),
  secondname VARCHAR(255),
  phone VARCHAR(255),
  mobile VARCHAR(255),
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
  const creations = [ACCOUNTS_TABLE_CREATION, RESETS_TABLE_CREATION, CUSTOMERS_TABLE_CREATION]
  for (const q of creations) {
    try {
      await connection.query(q);
    } catch (e) {
      console.error(e.stack);
    }
  }
}

async function dropTables() {
  const drops = ['DROP TABLE passwordresets;', 'DROP TABLE customers;', 'DROP TABLE accounts;'];
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
 * Stores customer.
 * @param  {string} hash Hash string
 * @param  {object} email 
 * @param  {object} customer Customer object 
 */
async function storeCustomer(hash, email, customer) {
  const insertStatement = 'INSERT INTO customers (hash, email, customer, datetime) VALUES (?, NOW());';
  values = [
    [hash, email, JSON.stringify(customer)]
  ];
  await cudQuery(insertStatement, values);
}

/**
 * Set SAP ID received from the PI/PO system.
 * @param  {string} sapID 
 * @param  {string} hash Hash string 
 */
 async function setCustomerSAPID(sapID, hash) {
  let updateStatement = `UPDATE customers SET sapID = ? WHERE hash = ?;`;
  let values = [sapID, hash];
  await cudQuery(updateStatement, values);
}

/**
 * Retrieves customer from the database.
 * @param  {object} hash Hash string 
 */
 async function getCustomer(hash) {
  const selectStatement = 'SELECT * FROM customers WHERE hash = ?';
  const values = [hash];
  let result = (await selectQuery(selectStatement, values))[0];
  if (result) {
    return {
      customer: JSON.parse(result.customer),
      email: result.email,
      hash: result.hash,
    };
  } else {
    return false;
  }
}

/**
 * Retrieves all customers from the database.
 * @param  {string} email User email
 */
 async function getCustomers(email) {
  const selectStatement = 'SELECT * FROM customers WHERE email = ?;';
  const values = [email];
  let customers = await selectQuery(selectStatement, values);
  customers = customers.map(val => {
    return {
      customer: JSON.parse(val.customer),
      email: val.email,
      sapID: val.sapID,
      datetime: val.datetime
    }
  });
  return customers;
}

/**
 * Stores account.
 * @param  {object} account Account object 
 */
async function storeAccount(account) {
  const insertStatement = 'INSERT INTO accounts (email, username, password, companycode, salutationcode, role, blocked, firstname, secondname, phone, mobile) VALUES (?);';
  const values = [[account.email, account.username, account.password, account.companyCode, account.salutationCode, account.role, false, account.firstName, account.secondName, account.phone, account.mobile]];
  await cudQuery(insertStatement, values);
}

/**
 * Stores password reset.
 * @param  {string} hash
 * @param  {string} email  
 */
async function storePasswordReset(hash, email) {
  const insertStatement = 'INSERT INTO passwordresets (hash, email, datetime) VALUES (?, NOW());';
  const values = [[hash, email]];
  await cudQuery(insertStatement, values);
}

/**
 * Updates account if ADMIN updates USER.
 * @param  {object} account Account object 
 */
async function updateAccountADMIN(account) {
  let updateStatement = `UPDATE accounts SET companycode = ?, salutationcode = ? , blocked = ?, firstname = ?, secondname = ?, phone = ?, mobile = ? WHERE email = ?;`;
  let values = [account.companyCode, account.salutationCode, account.blocked, account.firstName, account.secondName, account.phone, account.mobile, account.email];
  await cudQuery(updateStatement, values);
}

/**
 * Updates account if ADMIN updates Itself.
 * @param  {object} account Account object 
 */
 async function updateAccountADMINItself(account) {
  let updateStatement = `UPDATE accounts SET companycode = ?, salutationcode = ? , firstname = ?, secondname = ?, phone = ?, mobile = ? WHERE email = ?;`;
  let values = [account.companyCode, account.salutationCode, account.firstName, account.secondName, account.phone, account.mobile, account.email];
  //If we change password
  if (account.password) {
    updateStatement = `UPDATE accounts SET password = ?,  companycode = ?, salutationcode = ? , firstname = ?, secondname = ?, phone = ?, mobile = ? WHERE email = ?;`;
    values = [account.password, account.companyCode, account.salutationCode, account.firstName, account.secondName, account.phone, account.mobile, account.email];
  }
  await cudQuery(updateStatement, values);
}

/**
 * Updates account for USER.
 * @param  {object} account Account object 
 */
 async function updateAccountUSERItself(account) {
  let updateStatement = `UPDATE accounts SET companycode = ? WHERE email = ?;`;
  let values = [account.companyCode, account.email];
  //If we change password
  if (account.password) {
    updateStatement = `UPDATE accounts SET password = ?, companycode = ? WHERE email = ?;`;
    values = [account.password, account.companyCode];
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
 * @returns true if account is not
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
      salutationCode: result.salutationcode || '0000',
      firstName: result.firstname || '',
      secondName: result.secondname || '',
      phone: result.phone || '',
      mobile: result.mobile || '',
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
      salutationCode: val.salutationcode || '0000',
      firstName: val.firstname || '',
      secondName: val.secondname || '',
      phone: val.phone || '',
      mobile: val.mobile || '',
      role: val.role,
      blocked: val.blocked
    }
  });
  return accounts;
}

/**
 * Checks if customer with a given hash.
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
 * Checks if password reset with a given hash.
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
  const deleteStatement = "DELETE FROM customers WHERE datetime < NOW() - INTERVAL ? DAY";
  const values = [process.env.DB_STORAGE_DURATION];
  //Remove all customers, which are older than process.env.DB_STORAGE_DURATION
  await cudQuery(deleteStatement, values);
}

module.exports = {
  storeAccount,
  getAccount,
  getAccounts,
  deleteAccount,
  updateAccountUSERItself,
  updateAccountADMIN,
  updateAccountADMINItself,
  removeOldCustomers,
  checkCustomerConfirmation,
  checkPasswordResetConfirmation,
  isAccountNotExists,
  storeCustomer,
  getCustomer,
  getCustomers,
  setCustomerSAPID,
  storePasswordReset,
  createTables,
  dropTables,
  connect
};