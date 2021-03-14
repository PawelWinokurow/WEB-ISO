const express = require('express');
const schedule = require('node-schedule');
const cors = require('cors');
const logger = require('morgan');
const fetch = require('node-fetch');
const httpsProxyAgent = require('https-proxy-agent');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');


require('dotenv').config();

const databaseService = require('./services/database_service');
const soapService = require('./services/soap_service');
const emailService = require('./services/email_service');
const cryptoService = require('./services/crypto_service');
const maskService = require('./services/mask_service');
const middlewareService = require('./services/middleware_service');

databaseService.connect();

//envelope.xml for test
const ENVELOPE_URL = path.join(__dirname, "wsdl", 'envelope.xml');

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
    this.getUsers = this.getUsers.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.createUser = this.createUser.bind(this);
    this.confirm = this.confirm.bind(this);
    this.blockOrResetUser = this.blockOrResetUser.bind(this);
    this.privateKey = fs.readFileSync(process.env.PRIVATE_KEY);
    this.wsdlUrl = path.join(__dirname, "wsdl", process.env.WSDL_FILENAME);
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
        const mask = JSON.parse(result[0].mask)
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
    const options = {
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
    let maskData = req.body.mask;

    composeMask(maskData).then(
      sapMask => {
        var envelope = sapMask.getJSONArgs();
        var envelope = JSON.stringify(sapMask.getJSONArgs());
        if (maskData.isDirect) {
          soapService.sendMask(envelope, this.wsdlUrl);
        } else {
          const hash = cryptoService.generateHash();
          //TODO Promise resolution
          databaseService.storeMask(hash, envelope).then();

          const message = {
            from: "BayWa",
            to: emailTo,
            subject: 'Mask confirmation',
            html: '<p>Click <a href="http://localhost:3000/confirm?hash=' + hash + '">here</a> to confirm the mask.</p>'
          };

          emailService.sendEmail(message);
        }
        res.json({
          ok: true
        });
      }
    );
  }

  refreshToken(req, res) {
    databaseService.getUser(req.body.decodedUser)
    .then(
      user => {
        delete user.password;
        delete user.blocked;
        const jwtBearerToken = jwt.sign(user, this.privateKey, {
          algorithm: 'RS256',
          expiresIn: process.env.JWT_DURATION,
        });

        //Send JWT back
        res.status(200).json({
          idToken: jwtBearerToken,
          expiresIn: process.env.JWT_DURATION,
          user: user
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
    const passwordToCheck = req.body.user.password;
    databaseService.getUser(req.body.user)
    .then(user => {
      if (!user.blocked && cryptoService.comparePasswords(passwordToCheck, user.password)) {
        delete user.password;
        delete user.blocked;
        const jwtBearerToken = jwt.sign(user, this.privateKey, {
          algorithm: 'RS256',
          expiresIn: process.env.JWT_DURATION,
        });
        //Send JWT back
        res.status(200).json({
          idToken: jwtBearerToken,
          expiresIn: process.env.JWT_DURATION,
          user: user
        });
      } else {
        // send status 401 Unauthorized
        res.status(401).send({
          error: "No match"
        });
      }
    }).catch(err => {
      console.log('catch')

      // send status 401 Unauthorized
      res.status(401).send({
        error: "No match"
      });

    });
  }

  createUser(req, res) {
    var user = req.body.user;
    var userToStore = {...user};
    userToStore.password = cryptoService.hashPassword(user.password);
    databaseService.isUserNotExists(user)
      .then(() => databaseService.storeUser(userToStore))
      .then(() => this.login(req, res))
      .catch(() => res.json({
        message: 'Duplicate'
      }))
  }

  updateUser(req, res) {
    var user = req.body.user;
    console.log(user)
    if (user.password) {
      databaseService.getUser(user)
        .then(dbUser => new Promise((resolve, reject) => {
          console.log(dbUser)
          if (cryptoService.comparePasswords(user.passwordOld, dbUser.password)) {
            user.password = cryptoService.hashPassword(user.password);
            resolve(user);
          }
          reject(false);
        }))
        .catch(err => {
          res.json({
            message: `Old password doesn't match`
          })
        })
        then(user => databaseService.updateUser(user))
        .then(() => res.json(user))
        .catch(err => res.status(500).send(`Database error: ${err}`))
      } else {
        databaseService.updateUser(user)
        .then(() => res.json(user))
        .catch(err => res.status(500).send(`Database error: ${err}`))
      }
  }

  deleteUser(req, res) {
    databaseService.deleteUser(req.body.user)
      .then(() => res.json({
        ok: true
      }))
      .catch(err => res.json({
        message: err
      }));
  }

  blockOrResetUser(req, res) {
    const user = req.body.user;
    if (user?.operation === 'block') {
      this.blockUser(req, res);
    } else if (user?.operation === 'reset') {
      this.resetPassword(req, res);
    }
  }

  resetPassword(req, res) {
    var user = req.body.user;
    var oldUser = { ...user }
    const newPassword = cryptoService.generateHash().slice(0, 20);
    user.password = cryptoService.hashPassword(newPassword);

    databaseService.updateUser(user)
      .then(() => res.json(user))
      .catch(err => res.status(500).send(`Database error: ${err}`))
      .then(() => {
        const message = {
          from: "WEB-ISO",
          to: user.email,
          subject: 'New password WEB-ISO',
          html: `<p>Your WEB-ISO password was reset. New WEB-ISO password: ${newPassword}</p>`
        };
        emailService.sendEmail(message);
      })
      .catch(err => {
        databaseService.updateUser(oldUser).then();
        res.status(500).send(`Email send error: ${err}`);
      });

  }

  blockUser(req, res) {
    databaseService.updateUser(req.body.user)
      .then(() => res.json(req.body.user))
      .catch(err => res.json({
        message: err
      }))
  }

  getUsers(req, res) {
    databaseService.getUsers()
      .then(users => res.json(users))
      .catch(err => res.json({
        message: err
      }))
  }

  initEndPoints() {
    /**
     * Enpoint to get customer masks from application.
     */
    this.expressApp.route("/request").post(middlewareService.checkIfAuthenticated, middlewareService.checkIfUserAvailable, this.createCustomer);

    /**
     * Endpoint to get login data.
     */
    this.expressApp.route("/login")
      .post(this.login)
      .put(middlewareService.checkIfAuthenticated, middlewareService.checkIfUserAvailable, this.refreshToken);

    /**
     * Endpoint to get email confirmations.
     */
    this.expressApp.route("/confirm").get(this.confirm);

    /**
     * Endpoint to get recaptcha token from the client.
     */
    this.expressApp.route('/recaptcha').post(middlewareService.checkIfAuthenticated, middlewareService.checkIfUserAvailable, this.validateRecaptcha);

    /**
     * Endpoint for user CRUD.
     * post: create user
     * put: update user
     * patch: block user
     * delete: delete user
     */
    this.expressApp.route('/user')
      .post(this.createUser)
      .put(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfUserAvailable, this.updateUser)
      .patch(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfUserAvailable, this.blockOrResetUser)
      .delete(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfUserAvailable, this.deleteUser);

    this.expressApp.route('/users').get(middlewareService.checkIfAuthenticated, middlewareService.checkIfFromAdmin, middlewareService.checkIfUserAvailable, this.getUsers);
  }

  start() {
    this.expressApp.listen(process.env.WEB_PORT, () => {
      console.log(`WEB-ISO server is listening at http://localhost:${process.env.WEB_PORT}`)
    })
  }
}

new Server().start()

/*
setTimeout(function () {
  //soapService.test()

  const message = {
    from: "BayWa",
    to: 'pawelwinokurow@gmail.com',
    subject: 'Mask confirmation',
    html: '<p>Click <a href="http://localhost:3000/confirm?hash=' + "asdadasdasa" + '">here</a> to confirm the mask.</p>'
  };
  //emailService.sendEmail('asdasdas', 'pawelwinokurow@gmail.com', message)
}, 1000);*/