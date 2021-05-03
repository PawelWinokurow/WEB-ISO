const soapService = require('../services/soap');
const databaseService = require('../services/database');
const cryptoService = require('../services/crypto');
const emailService = require('../services/email');
const customerService = require('../services/customer');
const dataService = require('../services/data');
const errorHandler = require('../middlewares/error');


async function confirmCustomerRequest(req, res) {
  try {
    const hash = req.query.hash;
    const result = await databaseService.getCustomer(hash);
    if (result) {
      const sapCustomer = await customerService.composeCustomer(result.customer);
      const envelope = sapCustomer.getJSONArgs();
      const sapID = await soapService.sendCustomer(envelope);
      //await databaseService.setCustomerSAPID(sapID, result.hash)
      await databaseService.setCustomerConfirmation(hash)
      emailService.sendCustomerAcknowledgement(result.email, sapID);
      res.send('<p>Success! The customer was confirmed.</p>');
    }
  } catch (e) {
    console.error(e.stack);
    res.send('<p>Error! The customer was not confirmed.</p>');
  }
}

async function sendCustomerRequest(req, res) {
  try {
    const customer = req.body.customer;
    const email = req.body.decodedAccount.email;
    const hash = cryptoService.generateHash();
    dataService.storeFiles(customer.data.files, hash)
    delete customer.data.files
    await databaseService.storeCustomer(hash, email, customer, false);
    emailService.sendCustomerConfirmation(email, hash);
    res.json({
      message: 'CUSCONFISSND',
    });
  } catch (e) {
    errorHandler.unknownErrorResponse(e, 500);
  }
}

async function sendCustomerDirect(req, res) {
  try {
    let customer = req.body.customer;
    const email = req.body.decodedAccount.email;
    const hash = cryptoService.generateHash();
    
    const sapCustomer = await customerService.composeCustomer(customer);
    const envelope = sapCustomer.getJSONArgs();
    const sapID = await soapService.sendCustomer(envelope);
    dataService.storeFiles(customer.data.files, hash)
    delete customer.data.files
    await databaseService.storeCustomer(hash, email, customer, true);
    //await databaseService.setCustomerSAPID(sapID, hash)
    //emailService.sendCustomerAcknowledgement(email, sapID);

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
  sendCustomerDirect,
  sendCustomerRequest,
  getCustomers
}