var express = require('express');
var schedule = require('node-schedule');
var cors = require('cors');
var logger = require('morgan');
var fetch = require('node-fetch');
var httpsProxyAgent = require('https-proxy-agent');
var path = require('path');
var jwt = require('jsonwebtoken');
var fs = require('fs');


require('dotenv').config();

var databaseService = require('./services/database_service');
var soapService = require('./services/soap_service');
var emailService = require('./services/email_service');
var cryptoService = require('./services/crypto_service');
var maskService = require('./services/mask_service');

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
    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.createUser = this.createUser.bind(this);
    this.confirm = this.confirm.bind(this);
    this.checkIfAuthenticated = this.checkIfAuthenticated.bind(this);
    this.checkIfUpdatesItself = this.checkIfUpdatesItself.bind(this);
    this.privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
    this.publicKey = fs.readFileSync(process.env.PUBLIC_KEY);
    this.wsdlUrl = path.join(__dirname, "wsdl", process.env.WSDL_FILENAME);
    fetch(process.env.PROXY).then(() => {
      process.env.HTTP_PROXY = process.env.PROXY;
      process.env.HTTPS_PROXY = process.env.PROXY;
      this.proxyAgent = new httpsProxyAgent(process.env.EMAIL_PROXY); // We need HttpsProxyAgent to use proxy for re-captcha
    }).catch(() => {}).finally(() => {
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
        soapService.sendMask(mask, this.wsdlUrl);
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
        //console.log(envelope)
        if (maskData.isDirect) {
          soapService.sendMask(envelope, this.wsdlUrl);
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

  checkIfAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const jwtBearerToken = authHeader.split(' ')[1];

      jwt.verify(jwtBearerToken, this.publicKey, {
        algorithm: ['RS256']
      }, (err, user) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

  //Checks if request updates itself or comes from ADMIN
  checkIfUpdatesItself(req, res, next){
    const authHeader = req.headers.authorization;
    const updated_user = req.body;
    if (authHeader) {
      const jwtBearerToken = authHeader.split(' ')[1];

      jwt.verify(jwtBearerToken, this.publicKey, {
        algorithm: ['RS256']
      }, (err, user) => {
        if (err) {
          console.log(err);
          return res.sendStatus(403);
        }
        if (updated_user.username === user.username && updated_user.email === user.email 
          || user.role === 'ADMIN' && updated_user.role === 'USER') {
            req.user = user;
            next();
          } else {
            res.sendStatus(401);
          }
      });
    } else {
      res.sendStatus(401);
    }
  };

  refreshToken(req, res) {
    const user = req.body;
    databaseService.getUser(user).then(
      user => {
        var user_json = {
          username: user.username,
          email: user.email,
          companyCode: user.companycode,
          role: user.role
        }
        const jwtBearerToken = jwt.sign(user_json, this.privateKey, {
          algorithm: 'RS256',
          expiresIn: process.env.JWT_DURATION,
        });

        //Send JWT back
        res.status(200).json({
          idToken: jwtBearerToken,
          expiresIn: process.env.JWT_DURATION,
          user: user_json
        });
      }
    ).catch(err => {
      // send status 401 Unauthorized
      res.status(401).send({
        error: "No match"
      });
    });
  }

  login(req, res) {
    // Checks if the user exists and if the password matches
    function checkPassword(identifier, plaintextPassword) {
      return new Promise((resolve, reject) => {
        databaseService.getUser({email: identifier, username: identifier}).then(user => {
          if (cryptoService.comparePasswords(plaintextPassword, user.password)) {
            resolve(user);
          }
          reject(false);
        })
      });
    }
    const identifier = req.body.identifier;
    const password = req.body.password;
    checkPassword(identifier, password).then(
      user => {
        var user_json = {
          username: user.username,
          email: user.email,
          companyCode: user.companycode,
          role: user.role
        }
        const jwtBearerToken = jwt.sign(user_json, this.privateKey, {
          algorithm: 'RS256',
          expiresIn: process.env.JWT_DURATION,
        });

        //Send JWT back
        res.status(200).json({
          idToken: jwtBearerToken,
          expiresIn: process.env.JWT_DURATION,
          user: user_json
        });
      }
    ).catch(err => {
      // send status 401 Unauthorized
      res.status(401).send({
        error: "No match"
      });
    });
  }

  createUser(req, res) {
    var user = req.body;
    user.password = cryptoService.hashPassword(user.password);
    databaseService.checkUser(user)
      .catch(() => res.json({
        message: 'Duplicate'
      }))
      .then(() => databaseService.storeUser(user))
      .then(() => res.json({
        ok: true
      }))
  }

  updateUser(req, res) {
    var user = req.body;
    const authHeader = req.headers.authorization;
    //console.log(authHeader);
    if (user.password) {
      user.password = cryptoService.hashPassword(user.password);
    }
    databaseService.updateUser(user)
      .then(() => res.json(user))
      .catch(err => res.status(500).send(`Database error: ${err}`))
  }

  deleteUser(req, res) {
    var user = req.body;
    user.password = cryptoService.hashPassword(user.password);
    databaseService.deleteUser(user)
      .then(() => res.json({
        ok: true
      }))
      .catch(err => res.json({
        message: err
      }))
  }

  initEndPoints() {
    /**
     * Enpoint to get customer masks from application.
     */
    this.expressApp.route("/request").post(this.checkIfAuthenticated, this.createCustomer);

    /**
     * Endpoint to get login data.
     */
    this.expressApp.route("/login")
      .post(this.login)
      .put(this.checkIfAuthenticated, this.refreshToken);

    /**
     * Endpoint to get email confirmations.
     */
    this.expressApp.route("/confirm").get(this.confirm);

    /**
     * Endpoint to get recaptcha token from the client.
     */
    this.expressApp.route('/recaptcha').post(this.checkIfAuthenticated, this.validateRecaptcha);

    /**
     * Endpoint for user CRUD.
     */
    this.expressApp.route('/user')
      .post(this.createUser)
      .put(this.checkIfUpdatesItself, this.updateUser)
      .delete(this.checkIfUpdatesItself, this.deleteUser);
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