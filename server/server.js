var express = require('express');
var db = require('./database')
var email = require('./email')
var soap = require('./soap')
var app = express();

app.use(express.json());

var dbConnection = db.connectToDB();

app.all("/request", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  let body = req.body;

  connection.end();
  if (body.isDirect) {

  } else {
    //email.sendMail();

  }
  next();
});

app.all("/confirm", function (req, res, next) {
  let body = req.body;
  console.log(body.isDirect);

  next();
});

// start the server in the port 3000 !
app.listen(3000, function () {
  console.log('Example app listening on port 3000.');
});