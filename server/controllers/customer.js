const soapService = require('../services/soap');
const databaseService = require('../services/database');
const cryptoService = require('../services/crypto');
const emailService = require('../services/email');
const errorHandler = require('../middlewares/error');


async function confirmCustomerRequest(req, res) {
  try {
    const hash = req.query.hash;
    const result = await databaseService.getCustomer(hash);
    if (result) {
      const sapCustomer = await composeCustomer(result.customer);
      const envelope = sapCustomer.getJSONArgs();
      const sapID = await soapService.sendCustomer(envelope);
      await databaseService.setCustomerSAPID(sapID, result.hash)
      emailService.sendCustomerAcknowledgement(result.email, sapID);
      res.send('<p>Success! The customer was confirmed.</p>');
    }
  } catch (e) {
    console.error(e.stack);
    res.send('<p>Error! The customer was not confirmed.</p>');
  }
}

async function createCustomerRequest(req, res) {
  try {
    const customer = req.body.customer;
    const email = req.body.decodedAccount.email;
    const hash = cryptoService.generateHash();
    await databaseService.storeCustomer(hash, email, customer);
    emailService.sendCustomerConfirmation(email, hash);
    res.json({
      message: 'CUSCONFISSND',
    });
  } catch (e) {
    errorHandler.unknownErrorResponse(e, 500);
  }
}

async function createCustomerDirect(req, res) {
  try {
    const customer = req.body.customer;
    const email = req.body.decodedAccount.email;
    const hash = cryptoService.generateHash();
    await databaseService.storeCustomer(hash, email, customer);
    const sapCustomer = await composeCustomer(customer);
    const envelope = sapCustomer.getJSONArgs();
    const sapID = await soapService.sendCustomer(envelope);
    await databaseService.setCustomerSAPID(sapID, hash)
    emailService.sendCustomerAcknowledgement(email, sapID);
    res.json({
      message: 'CUSISSND',
    });
  } catch (e) {
    errorHandler.unknownErrorResponse(e, 500);
  }
}

async function getCustomers(req, res) {
  try {
    const email = req.body.decodedAccount.email;
    const customers = await databaseService.getCustomers(email);
    res.json(customers)
  } catch (e) {
    errorHandler.unknownErrorResponse(e, 500);
  }
}

module.exports = {
  confirmCustomerRequest,
  createCustomerDirect,
  createCustomerRequest,
  getCustomers
}