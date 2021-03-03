var mysql = require("mysql2");
require('dotenv').config()

const TABLECREATION = "CREATE TABLE IF NOT EXISTS masks ( hash VARCHAR(255) NOT NULL PRIMARY KEY, mask TEXT NOT NULL, datetime DATETIME NOT NULL);";

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
    //Create table of customer masks if table not exists
    connection.query(TABLECREATION,
      function (err, results, fields) {
        if (err) throw err;
            //console.log(results);
            //console.log(err);
            //console.log(fields)
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

exports.checkConfirmation = function (hash) {
  return new Promise((resolve, reject) => {
    const select_statement = 'SELECT mask FROM masks WHERE hash = ?';
    //Select values
    connection.query(select_statement, [hash],
      function (err, result, fields) {
        if (err) throw err;
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
 * Closes connectino to the database server.
 */
exports.close = function () {
  connection.end();
}
/**
 * Removes old customer masks.
 */
exports.removeOldMasks = function() {
  const remove_statement = "DELETE FROM masks WHERE datetime < NOW() - INTERVAL ? DAY";
  //Remove all customer masks, which are older than process.env.DB_STORAGE_DURATION
  connection.query(remove_statement, [process.env.DB_STORAGE_DURATION], function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
}

