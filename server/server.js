var express = require('express');
var schedule = require('node-schedule');
var cors = require('cors');
var logger = require('morgan');
var fetch = require('node-fetch');
var db_service = require('./services/database_service');
var soap_service = require('./services/soap_service');
var email_service = require('./services/email_service');
var random_service = require('./services/random_service');
var HttpsProxyAgent = require('https-proxy-agent');


//db_service.connect();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

// We need HttpsProxyAgent to use proxy for re-captcha
var proxyAgent = new HttpsProxyAgent(process.env.EMAIL_PROXY);

/**
 * Runs each day at 00.00 and removes old not confirmed customer masks.
 */
schedule.scheduleJob('0 0 * * *', function () {
  db_service.removeOldMasks();
});

/**
 * Enpoint to get customer masks from application.
 */
app.post("/request", function (req, res, next) {
  let mask = req.body;
  console.log(mask)
  if (mask.isDirect) {
    soap_service.sendMask(mask.sapMask);
  } else {
    const hash = random_service.generateHash();
    db_service.storeMask(hash, mask.sapMask);
    email_service.sendEmail(hash, mask.emailTo);
  }
  res.json({
    ok: true
  });
});

/**
 * Endpoint to get email confirmations.
 */
app.get("/confirm", function (req, res, next) {
  db_service.checkConfirmation(req.query.hash).then(result => {
      var mask = JSON.parse(result.mask)
      soap_service.sendMask(mask);
      res.send('<p>Success! The mask was confirmed.</p>');
      next();
    })
    .catch(() => {
      res.send('<p>Error! The mask was not confirmed.</p>');
      next();
    })
});

/**
 * Endpoint to get recaptcha token from the client.
 */
app.post('/token_validate', (req, res) => {

  let token = req.body.recaptcha;

  if (token === null || token === undefined) {
    res.status(201).send({
      success: false,
      message: "Token is empty or invalid"
    })
    return console.log("token empty");
  }
  fetch(process.env.RECAPTCHA_HOST, {
      agent: proxyAgent,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: `secret=${process.env.RECAPTCHA_KEY}&response=${token}&remoteip=${req.socket.remoteAddress}`
    })
    .then(res => res.json()).catch(err => {
      res.send({
        success: false
      });
      return console.log(`Error: ${err}`);
    })
    .then(json => {
      if (json.success !== undefined && !json.success) {
        res.send({
          success: false
        });
      }
      console.log('captcha')
      console.log(json)
      //if passed response success message to client.
      res.send({
        success: true
      });
    });
})

app.listen(process.env.WEB_PORT, () => {

  //soap_service.test()
  email_service.sendEmail('asdasdas', 'pawelwinokurow@gmail.com')
  console.log(`WEB-ISO server is listening at http://localhost:${process.env.WEB_PORT}`)
})