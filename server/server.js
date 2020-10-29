// Require express and create an instance of it
const { response } = require('express');
var express = require('express');
var db = require('./database')
var rnd = require('./random')
var app = express();

app.use(express.json());
db.connectToDB();

app.all("/", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    console.log(req.body.name);
    res.json({blablaStatus: "ok"});
    next();
  });

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});