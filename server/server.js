var express = require('express');
var schedule = require('node-schedule');
var cors = require('cors');
var logger = require('morgan');
var fetch = require('node-fetch');
var httpsProxyAgent = require('https-proxy-agent');
var path = require('path');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var util = require('util')
require('dotenv').config();


var databaseService = require('./services/database_service');
var soapService = require('./services/soap_service');
var emailService = require('./services/email_service');
var cryptoService = require('./services/crypto_service');
var maskService = require('./services/mask_service');
const { resolve } = require('path');


databaseService.connect();

//envelope.xml for test
var ENVELOPE_URL = path.join(__dirname, "wsdl", 'envelope.xml');

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
    this.confirm = this.confirm.bind(this);
    this.validateRecaptcha = this.validateRecaptcha.bind(this);
    this.createCustomer = this.createCustomer.bind(this);
    this.loginRoute = this.loginRoute.bind(this);
    this.createUser = this.createUser.bind(this);
    this.auth_key = fs.readFileSync(process.env.PRIVATE_KEY);
    fetch(process.env.PROXY).then(() => {
      process.env.HTTP_PROXY = process.env.PROXY;
      process.env.HTTPS_PROXY = process.env.PROXY;
      this.proxyAgent = new httpsProxyAgent(process.env.EMAIL_PROXY); // We need HttpsProxyAgent to use proxy for re-captcha
    }).catch(() => { }).finally(() => {
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

  confirm(req, res) {
    databaseService.checkConfirmation(req.query.hash)
      .then(result => {
        var mask = JSON.parse(result.mask)
        soapService.sendMask(mask);
        res.send('<p>Success! The mask was confirmed.</p>');
      })
      .catch(() => {
        res.send('<p>Error! The mask was not confirmed.</p>');
      });
  }

  validateRecaptcha(req, res) {
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
        //if passed response success message to client.
        res.send({
          success: true
        });
      })
  }

  createCustomer(req, res) {
    function composeMask(maskData) {
      var maskFactory = null
      if (maskData.customerType === 'person') {
        if (maskData.debitCreditType === 'debit') {
          maskFactory = new maskService.PersonDebitFactory(maskData, ENVELOPE_URL);
        } else if (maskData.debitCreditType === 'credit') {
          maskFactory = new maskService.PersonCreditFactory(maskData, ENVELOPE_URL);
        }
      } else if (maskData.customerType === 'organization') {
        if (maskData.debitCreditType === 'debit') {
          maskFactory = new maskService.OrganizationDebitFactory(maskData, ENVELOPE_URL);
        } else if (maskData.debitCreditType === 'credit') {
          maskFactory = new maskService.OrganizationCreditFactory(maskData, ENVELOPE_URL);
        }
      }
      return maskFactory.build();
    }
    let maskData = req.body;

    composeMask(maskData).then(
      sapMask => {
        var envelope = sapMask.getJSONArgs();
        if (maskData.isDirect) {
          soapService.sendMask(envelope);
        } else {
          const hash = cryptoService.generateHash();
          databaseService.storeMask(hash, envelope);
          emailService.sendEmail(hash, maskData.emailTo);
        }
        res.json({
          ok: true
        });
      }
    );
  }

  loginRoute(req, res) {
    // Checks if the user exists and if the password matches
    function checkPassword(identifier, plaintextPassword) {
      return new Promise((resolve, reject) => {
        databaseService.getUsers(identifier).then(users => {
          if (users.length == 0) {
            resolve(false);
          }
          resolve(users.find(user => cryptoService.comparePasswords(plaintextPassword, user.password)));
        })
      });
    }
    const identifier = req.body.identifier;
    const password = req.body.password;
    checkPassword(identifier, password).then(
      user => {
        if (user) {
          const jwtBearerToken = jwt.sign({username: user.username, email: user.email, companyCode: user.companyCode}, this.auth_key, {
            algorithm: 'RS256',
            expiresIn: process.env.JWT_DURATION,
            //subject: user.email
          });
          //Send JWT back
          res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: process.env.JWT_DURATION
          });
        } else {
          // send status 401 Unauthorized
          res.sendStatus(401).send({ error: "No match" });;
        }
      }
    );
  }

  createUser(req, res) {
    var user = req.body;
    user.password = cryptoService.hashPassword(user.password);
    databaseService.checkUser(user)
      .then(() => databaseService.storeUser(user))
      .then(() => res.json({ ok: true }))
      .catch(() => res.json({ message: 'Duplicate' }))
  }

  initEndPoints() {
    /**
     * Enpoint to get customer masks from application.
     */
    this.expressApp.route("/request").post(this.createCustomer);

    /**
     * Endpoint to get login data.
     */
    this.expressApp.route("/login").post(this.loginRoute);

    /**
     * Endpoint to get email confirmations.
     */
    this.expressApp.route("/confirm").get(this.confirm);

    /**
     * Endpoint to get recaptcha token from the client.
     */
    this.expressApp.route('/token_validate').post(this.validateRecaptcha);

    /**
     * Endpoint to create new user.
     */
    this.expressApp.route('/createuser').post(this.createUser);
  }

  start() {
    this.expressApp.listen(process.env.WEB_PORT, () => {
      console.log(`WEB-ISO server is listening at http://localhost:${process.env.WEB_PORT}`)
    })
  }

}

new Server().start()

setTimeout(function () {
  //soapService.test()
  //emailService.sendEmail('asdasdas', 'pawelwinokurow@gmail.com')
}, 1000);