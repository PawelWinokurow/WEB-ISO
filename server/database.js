var mysql = require('mysql');

const host = "localhost";
const user = "root";
const password = "root";
const database = "kea";

const TABLECREATION = "CREATE TABLE IF NOT EXISTS MASKS( hash VARCHAR(255) NOT NULL PRIMARY KEY, name VARCHAR (255) NOT NULL);";

var connection;
exports.connect = function () {
  connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
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
  const sql = 'INSERT INTO masks (hash, name) VALUES (?)';
  values = [hash, mask.name];
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
        if (err) reject(err);
        resolve(result[0]);
      });
  });
}

exports.close = function () {
  connection.end();
}
