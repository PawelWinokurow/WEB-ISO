var mysql = require('mysql');

const host = "localhost";
const user = "root";
const password = "root";
const database = "kea";

const DBCREATION = "CREATE DATABASE db;";
const TABLECREATION = "CREATE TABLE IF NOT EXISTS MASKS( HASH VARCHAR(255) NOT NULL PRIMARY KEY, NAME VARCHAR (20) NOT NULL);";


exports.connectToDB = function() {
    var connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
      });

      connection.connect(function(err) {
      
        if (err) throw err;

        connection.query(TABLECREATION,
          function (err, results, fields) {
            /*console.log(err);
            console.log(results);
            console.log(fields);*/
          });
        


        return connection;
      });
}
