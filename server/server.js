const express = require('express');
const schedule = require('node-schedule');
const cors = require('cors');
const logger = require('morgan');
const fetch = require('node-fetch');
const httpsProxyAgent = require('https-proxy-agent');
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');

require('dotenv').config();

const cryptoService = require('./services/crypto_service');
const databaseService = require('./services/database_service');
const customerService = require('./services/customer_service');
const middlewareService = require('./services/middleware_service');
const authService = require('./services/auth_service');
const accountService = require('./services/account_service');
const recaptchaService = require('./services/recaptcha_service');
const soapService = require('./services/soap_service');
const testService = require('./services/test_service');

/**
 * Class to to manage the server. It contains node js express application.
 */
class Server {

  constructor() {
    this.init();
  }

  async init() {
    this.expressApp = express();
    this.expressApp.use(logger('dev'));
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    this.expressApp.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    await databaseService.connect();
    await databaseService.createTables();
    await testService.storeTestData();
    try {
      await fetch(process.env.PROXY);
      process.env.HTTP_PROXY = process.env.PROXY;
      process.env.HTTPS_PROXY = process.env.PROXY;
      // We need HttpsProxyAgent to use proxy for re-captcha
      recaptchaService.setProxyAgent(new httpsProxyAgent(process.env.EMAIL_PROXY));
    } catch (e) {
      if (e.code === 'ENOTFOUND') {
        console.log('Not in proxy');
      } else {
        console.error(e.stack);
      }
    } finally {
      this.runSchedule();
      this.configureEndPoints();
    }
  }

  /**
   * Runs each day at 00.00 and removes old not confirmed customers.
   */
  runSchedule() {
    schedule.scheduleJob('0 0 * * *', function () {
    //chedule.scheduleJob('* * * * *', function () {
      databaseService.removeOldCustomers();
    });
  }

  configureEndPoints() {

    /**
     * Endpoint to get login data.
     */
    this.expressApp.route("/login")
      .post(authService.login)
      .put(middlewareService.checkIfAuthenticated, middlewareService.checkIfAccountAvailable, authService.refreshToken);

    /**
     * Endpoint for customer operations.
     * get: get all customer created by user
     * post: send customer direct to sap
     */
    this.expressApp.route("/customers")
      .get(middlewareService.checkIfAuthenticated, middlewareService.checkEmail, middlewareService.checkIfAccountAvailable, customerService.getCustomers)
      .post(middlewareService.checkIfAuthenticated, middlewareService.checkIfAccountAvailable, customerService.createCustomerDirect);

    /**
     * Enpoint to request new customers from application.
     */
    this.expressApp.route("/customers/request")
      .post(middlewareService.checkIfAuthenticated, middlewareService.checkIfAccountAvailable, customerService.createCustomerRequest);

    /**
     * Endpoint to get email confirmations.
     */
    this.expressApp.route("/customers/confirm")
      .get(customerService.confirmCustomerRequest);

    /**
     * Endpoint to get recaptcha token from the client.
     */
    this.expressApp.route('/customers/recaptcha')
      .post(middlewareService.checkIfAuthenticated, middlewareService.checkIfAccountAvailable, recaptchaService.validateRecaptcha);


    /**
     * Endpoint to reset password.
     */
    this.expressApp.route("/accounts/reset")
      .post(accountService.resetPassword);

    /**
    * Endpoint to request password reset.
    */
    this.expressApp.route("/accounts/reset/request")
      .post(accountService.requestPasswordReset);

    /**
    * Endpoint to validate hash sent by email.
    */
    this.expressApp.route("/accounts/reset/validation")
      .post(accountService.validatePasswordResetHash);


    /**
     * Endpoint for account operations.
     * get: get all accounts
     * post: create account
     * put: update account
     * patch: block account
     * delete: delete account
     */
    this.expressApp.route('/accounts')
      .get(middlewareService.checkIfAuthenticated, middlewareService.checkIfFromAdmin, middlewareService.checkIfAccountAvailable, accountService.getAccounts)
      .post(accountService.createAccount)
      .put(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfAccountAvailable, accountService.updateAccount)
      .patch(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfAccountAvailable, accountService.blockAccount)
      .delete(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfAccountAvailable, accountService.deleteAccount);
  }

  start() {
    this.expressApp.listen(process.env.PORT, () => {
      console.log(`WEB-ISO server is listening at ${process.env.HOST}`)
    })
  }
}

new Server().start()

setTimeout(function () {
  //soapService.test()
}, 1000);