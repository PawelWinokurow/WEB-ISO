var mysql = require('mysql');

var host = "localhost";
var user = "root";
var password = "root";

exports.connectToDB = function() {
    var con = mysql.createConnection({
        host: host,
        user: user,
        password: password
      });
    con.connect(function(err) {
        if (err) throw err;
        return con;
      });
}