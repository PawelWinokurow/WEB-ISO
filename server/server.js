const express = require('express');
const schedule = require('node-schedule');
const cors = require('cors');
const logger = require('morgan');
const fetch = require('node-fetch');
const httpsProxyAgent = require('https-proxy-agent');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');
const config = require('dotenv').config();
const databaseService = require('./services/database');
const recaptchaController = require('./controllers/recaptcha');
const testDataService = require('./services/test_data');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require('./routes/account'));
app.use(require('./routes/auth'));
app.use(require('./routes/customer'));


startServer(app);

/**
 * Starts express server.
 * @param  {object} app express application
 */
async function startServer(app) {
  await databaseService.connect();
  await databaseService.createTables();
  await testDataService.storeTestData();
  try {
    await fetch(process.env.PROXY);
    process.env.HTTP_PROXY = process.env.PROXY;
    process.env.HTTPS_PROXY = process.env.PROXY;
    // We need HttpsProxyAgent to use proxy for re-captcha
    recaptchaController.setProxyAgent(new httpsProxyAgent(process.env.EMAIL_PROXY));
    // Start Server
    app.listen(process.env.PORT, () => {
      console.log(`WEB-ISO server is running at ${process.env.HOST}`)
    })
  } catch (e) {
    if (e.code === 'ENOTFOUND') {
      console.log('Not in proxy');
    } else {
      console.error(e.stack);
    }
  } finally {
    /**
     * Runs each day at 00.00 and removes old not confirmed customers.
     */
    /*
    schedule.scheduleJob('0 0 * * *', function () {
      //chedule.scheduleJob('* * * * *', function () {
        databaseService.removeOldCustomers();
      });
    */
  }
}