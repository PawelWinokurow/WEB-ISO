const mysql = require("mysql");
const config = require('./config');

const TABLECREATION = "CREATE TABLE IF NOT EXISTS MASKS( hash VARCHAR(255) NOT NULL PRIMARY KEY, name VARCHAR (255) NOT NULL, datetime DATETIME NOT NULL);";

var connection;
exports.connect = function () {
  connection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  });

  connection.connect(function (err) {
    if (err) throw err;
    connection.query(TABLECREATION,
      function (err, results, fields) {
        if (err) throw err;
        //console.log(results);
        //console.log(fields)
      });
    return connection;
  });
}

exports.storeMask = function (hash, mask) {
  const sql = 'INSERT INTO masks (hash, name, datetime) VALUES (?)';
  var currentDatetime = time.getCurrentDatetime();
  values = [hash, mask.name, currentDatetime];
  connection.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
}

exports.checkConfirmation = function (hash) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM masks WHERE hash = ?';
    connection.query(sql, [hash],
      function (err, result, fields) {
        if (err) throw err;
        if (Array.isArray(result) && result.length) {
          resolve(result[0]);
        } else {
          reject(result);
        }

      });
  });
}

exports.close = function () {
  connection.end();
}

exports.removeOldMasks = function() {
  const sql = "DELETE FROM masks WHERE datetime < NOW() - INTERVAL ? DAY";
  connection.query(sql, [config.mysql.maskStorageTime], function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
}

