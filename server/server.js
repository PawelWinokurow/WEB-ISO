const express = require('express');
const schedule = require('node-schedule');
const cors = require('cors');
const logger = require('morgan');
const fetch = require('node-fetch');
const httpsProxyAgent = require('https-proxy-agent');
const cryptoService = require('./services/crypto_service');

require('dotenv').config();

const databaseService = require('./services/database_service');
const customerService = require('./services/customer_service');
const middlewareService = require('./services/middleware_service');
const authService = require('./services/auth_service');
const accountService = require('./services/account_service');
const recaptchaService = require('./services/recaptcha_service');
const soapService = require('./services/soap_service');

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
    await databaseService.connect();
    await databaseService.createTables();
    storeTestData();
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
      databaseService.removeOldCustomers();
    });
  }

  configureEndPoints() {
    /**
     * Enpoint to get new customers from application.
     */
    this.expressApp.route("/request").post(middlewareService.checkIfAuthenticated, middlewareService.checkIfAccountAvailable, customerService.createCustomer);

    /**
     * Endpoint to get login data.
     */
    this.expressApp.route("/login")
      .post(authService.login)
      .put(middlewareService.checkIfAuthenticated, middlewareService.checkIfAccountAvailable, authService.refreshToken);

    /**
     * Endpoint to get email confirmations.
     */
    this.expressApp.route("/confirm").get(customerService.confirmCustomer);

    /**
     * Endpoint to get recaptcha token from the client.
     */
    this.expressApp.route('/recaptcha').post(middlewareService.checkIfAuthenticated, middlewareService.checkIfAccountAvailable, recaptchaService.validateRecaptcha);

    /**
     * Endpoint for account CRUD.
     * post: create account
     * put: update account
     * patch: block account
     * delete: delete account
     */
    this.expressApp.route('/account')
      .get(accountService.confirmPasswordReset)
      .post(accountService.createAccount)
      .put(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfAccountAvailable, accountService.updateAccount)
      .patch(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfAccountAvailable, accountService.blockOrResetAccount)
      .delete(middlewareService.checkIfAuthenticated, middlewareService.checkIfUpdatesItself, middlewareService.checkIfAccountAvailable, accountService.deleteAccount);

    this.expressApp.route('/accounts').get(middlewareService.checkIfAuthenticated, middlewareService.checkIfFromAdmin, middlewareService.checkIfAccountAvailable, accountService.getAccounts);
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

async function storeTestData() {
  await databaseService.connect()
  await databaseService.dropTables();
  await databaseService.createTables();

  let accounts = [
    {
      username: 'admin',
      email: 'admin@admin.de',
      companyCode: '1100',
      password: cryptoService.hashPassword('admin'),
      blocked: false,
      role: 'ADMIN',
    },
    {
      username: 'user',
      email: 'user@user.de',
      companyCode: '1100',
      password: cryptoService.hashPassword('user'),
      blocked: false,
      role: 'USER',
    },
    {
      username: 'user2',
      email: 'user2@user2.de',
      companyCode: '1100',
      password: cryptoService.hashPassword('user2'),
      blocked: false,
      role: 'USER',
    },
    {
      username: 'user3',
      email: 'user3@user3.de',
      companyCode: '1100',
      password: cryptoService.hashPassword('user3'),
      blocked: false,
      role: 'USER',
    },
  ];

  let reset = {
    hash: '100',
    email: 'user@user.de'
  }

  try {
  for (const accountToStore of accounts) {
      await databaseService.storeAccount(accountToStore)
  }
  await databaseService.storePasswordReset(reset.hash, reset.email)


} catch (e) {
  console.error(e.stack);
}

}