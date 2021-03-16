const express = require('express');
const schedule = require('node-schedule');
const cors = require('cors');
const logger = require('morgan');
const fetch = require('node-fetch');
const path = require('path');
const httpsProxyAgent = require('https-proxy-agent');

require('dotenv').config();

const databaseService = require('./services/database_service');
const soapService = require('./services/soap_service');
const emailService = require('./services/email_service');
const customerService = require('./services/customer_service');
const middlewareService = require('./services/middleware_service');
const authService = require('./services/auth_service');
const userService = require('./services/user_service');
const recaptchaService = require('./services/recaptcha_service');

databaseService.connect();

//envelope.xml for testing
const ENVELOPE_URL = path.join(__dirname, "wsdl", 'envelope.xml');

/**
 * Class to to manage the server. It contains node js express application.
 */
class Server {

  constructor() {
    this.expressApp = express();
    this.expressApp.use(logger('dev'));
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    fetch(process.env.PROXY).then(() => {
      process.env.HTTP_PROXY = process.env.PROXY;
      process.env.HTTPS_PROXY = process.env.PROXY;
      // We need HttpsProxyAgent to use proxy for re-captcha
      recaptchaService.setProxyAgent(new httpsProxyAgent(process.env.EMAIL_PROXY));
    }).catch(() => { }).finally(() => {
      this.runSchedule();
      this.configureEndPoints();
    });
  }

  /**
   * Runs each day at 00.00 and removes old not confirmed customers.
   */
  runSchedule() {
    schedule.scheduleJob('0 0 * * *', function () {
      databaseService.removeOldCustomers();
    });
  }

  configureEndPoints() {
    /**
     * Enpoint to get new customers from application.
     */
    this.expressApp.route("/request").post(middlewareService.checkIfAuthenticated, middlewareService.checkIfUserAvailable, customerService.createCustomer);

    /**
     * Endpoint to get login data.
     */
    this.expressApp.route("/login")
      .post(authService.login)
      .put(middlewareService.checkIfAuthenticated, middlewareService.checkIfUserAvailable, authService.refreshToken);

    /**
     * Endpoint to get email confirmations.
     */
    this.expressApp.route("/confirm").get(customerService.confirmCustomer);

    /**
     * Endpoint to get recaptcha token from the client.
     */
    this.expressApp.route('/recaptcha').post(middlewareService.checkIfAuthenticated, middlewareService.checkIfUserAvailable, recaptchaService.validateRecaptcha);

    /**
     * Endpoint for user CRUD.
     * post: create user
     * put: update user
     * patch: block user
     * delete: delete user
     */
    this.expressApp.route('/user')
      .post(userService.createUser)
      .put(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfUserAvailable, userService.updateUser)
      .patch(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfUserAvailable, userService.blockOrResetUser)
      .delete(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfUserAvailable, userService.deleteUser);

    this.expressApp.route('/users').get(middlewareService.checkIfAuthenticated, middlewareService.checkIfFromAdmin, middlewareService.checkIfUserAvailable, userService.getUsers);
  }

  start() {
    this.expressApp.listen(process.env.PORT, () => {
      console.log(`WEB-ISO server is listening at ${process.env.HOST}`)
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
    subject: 'Customer confirmation',
    html: '<p>Click <a href="http://localhost:3000/confirm?hash=' + "asdadasdasa" + '">here</a> to confirm the customer.</p>'
  };
  //emailService.sendEmail('asdasdas', 'pawelwinokurow@gmail.com', message)
}, 1000);*/