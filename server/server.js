var express = require('express');
var schedule = require('node-schedule');
var databaseService = require('./services/database_service');
var soapService = require('./services/soap_service');
var emailService = require('./services/email_service');
var randomService = require('./services/random_service');
var cors = require('cors');
var logger = require('morgan');
var fetch = require('node-fetch');
var httpsProxyAgent = require('https-proxy-agent');


require('dotenv').config();

//databaseService.connect();

/**
 * Class to to manage the server. It contains node js express application
 */
class Server {
  constructor() {
    this.expressApp = express();
    this.expressApp.use(logger('dev'));
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    this.proxyAgent = null;
    fetch(process.env.PROXY).then(() => {
      process.env.HTTP_PROXY = process.env.PROXY
      process.env.HTTPS_PROXY = process.env.PROXY
      this.proxyAgent = new httpsProxyAgent(process.env.EMAIL_PROXY); // We need HttpsProxyAgent to use proxy for re-captcha
      this.runSchedule();
      this.initEndPoints();
    }).catch(() => {
      this.runSchedule();
      this.initEndPoints();
    });

  }

  /**
   * Runs each day at 00.00 and removes old not confirmed customer masks
   */
  runSchedule() {
    schedule.scheduleJob('0 0 * * *', function () {
      databaseService.removeOldMasks();
    });
  }

  initEndPoints() {
    /**
     * Enpoint to get customer masks from application.
     */
    this.expressApp.post("/request", function (req, res, next) {
      let mask = req.body;
      if (mask.isDirect) {
        soapService.sendMask(mask.sapMask);
      } else {
        const hash = randomService.generateHash();
        databaseService.storeMask(hash, mask.sapMask);
        emailService.sendEmail(hash, mask.emailTo);
      }
      res.json({
        ok: true
      });
    });

    /**
     * Endpoint to get email confirmations.
     */
    this.expressApp.get("/confirm", function (req, res, next) {
      databaseService.checkConfirmation(req.query.hash).then(result => {
        var mask = JSON.parse(result.mask)
        soapService.sendMask(mask);
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
    this.expressApp.post('/token_validate', (req, res) => {
      let token = req.body.recaptcha;

      if (token === null || token === undefined) {
        res.status(201).send({
          success: false,
          message: "Token is empty or invalid"
        })
        return console.log("token empty");
      }
      var options = {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `secret=${process.env.RECAPTCHA_KEY}&response=${token}&remoteip=${req.socket.remoteAddress}`
      }
      if (this.proxyAgent) {
        options.agent = this.proxyAgent;
      }
      fetch(process.env.RECAPTCHA_HOST, options)
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
        })
    });
  }

  start() {
    this.expressApp.listen(process.env.WEB_PORT, () => {
      
      console.log(`WEB-ISO server is listening at http://localhost:${process.env.WEB_PORT}`)
    })
  }

}

new Server().start()

setTimeout(function(){ 
  //soapService.test_xml()
  soapService.test()
  //emailService.sendEmail('asdasdas', 'pawelwinokurow@gmail.com')

}, 1000);