var express = require('express');
var schedule = require('node-schedule');
var db = require('./database')
var soap = require('./soap')
var email = require('./email')
var random = require('./random')
var config = require('./config');

const app = express();

db.connect();
app.use(express.json());

schedule.scheduleJob('0 0 * * *', function(){
  db.removeOldMasks();
});

app.post("/request", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  let mask = req.body;
  
  if (mask.isDirect) {
    soap.sendMask(mask);
  } else {
    const hash = random.generateHash();
    db.storeMask(hash, mask);
    email.sendEmail(hash, mask.emailTo);
  }
  next();
});

app.get("/confirm", function (req, res, next) {
  db.checkConfirmation(req.query.hash)
    .then(mask => {
      soap.sendMask(mask);
      res.send('<p>Success! The mask was confirmed.</p>');
      next();
    })
    .catch(() => {
      res.send('<p>Error! The mask was not confirmed.</p>');
      next();
    })

});

app.listen(config.web.port, function () {
  soap.test()
  console.log('Example app listening on port 3000.');
});