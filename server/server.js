var express = require('express');
var schedule = require('node-schedule');
var db = require('./database')
var soap = require('./soap')
var email = require('./email')
var random = require('./random')
var request = require("request");
var cors = require('cors');
var logger = require('morgan');
var https = require('https');

require('dotenv').config()

db.connect();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());


/**
 * Runs each day at 00.00 and removes old not confirmed customer masks
 */
schedule.scheduleJob('0 0 * * *', function () {
  db.removeOldMasks();
});

/**
 * Enpoint to get customer masks from application.
 */
app.post("/request", function (req, res, next) {
  let mask = req.body;
  if (mask.isDirect) {
    soap.sendMask(mask.sapMask);
  } else {
    const hash = random.generateHash();
    db.storeMask(hash, mask.sapMask);
    email.sendEmail(hash, mask.emailTo);
  }
  res.json({ ok: true });
});

/**
 * Enpoint to get email confirmations.
 */
app.get("/confirm", function (req, res, next) {
  db.checkConfirmation(req.query.hash).then(result => {
    var mask = JSON.parse(result.mask)
    soap.sendMask(mask);
    res.send('<p>Success! The mask was confirmed.</p>');
    next();
  })
    .catch(() => {
      res.send('<p>Error! The mask was not confirmed.</p>');
      next();
    })
});

app.post('/token_validate', (req, res) => {

  let token = req.body.recaptcha;
  const secretKey = "6LdMVTEaAAAAAPvYbCo516FjdmFluRMinGvVL8Xk"; //the secret key from google admin;

  //token validation url is URL:
  //const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify'
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&amp;response=${token}&amp;remoteip=${req.connection.remoteAddress}`;
  if (token === null || token === undefined) {
    res.status(201).send({ success: false, message: "Token is empty or invalid" })
    return console.log("token empty");
  }
  //request.post({url: verificationUrl, form: {secret: secretKey, response: token, remoteip: req.connection.remoteAddress}}, function(err, response, body){

  https.get(verificationUrl, function (response) {

    response.on("data", data => {
      body = JSON.parse(data)

      if (body.success !== undefined && !data.success) {
        res.send({ success: false, 'message': "recaptcha failed" });
        return console.log("failed")
      }
      //if passed response success message to client
      res.send({ "success": true, 'message': "recaptcha passed" });
    })
  })

})

app.listen(process.env.WEB_PORT || 3000, () => {
  console.log(`WEB-ISO server is listening at http://localhost:${process.env.WEB_PORT || 3000}`)
})