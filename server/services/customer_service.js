const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const soapService = require('./soap_service');

const ENVELOPE_URL = path.join(__dirname, '..', "wsdl", process.env.ENVELOPE_FILENAME);
const WSDL_URL = path.join(__dirname, '..', "wsdl", process.env.WSDL_FILENAME);

class CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    this.customerData = customerData
    this.ENVELOPE_URL = ENVELOPE_URL
  }

  build() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.ENVELOPE_URL, (err, data) => {
        xml2js.parseString(data, (err, args) => {
          this.envelope = args.ENVELOPE
          resolve(this);
        });
      });
    });
  }
}

class PersonDebitFactory extends CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    super(customerData, ENVELOPE_URL);
  }

  getJSONArgs() {

  }
}

class PersonCreditFactory extends CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    super(customerData, ENVELOPE_URL);
  }

  getJSONArgs() {

  }
}

class OrganizationDebitFactory extends CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    super(customerData, ENVELOPE_URL);
  }

  getJSONArgs() {
    let dateToday = formatDate(new Date());

    console.log(this.customerData.data)

    //General information
    //Interface number
    this.envelope.IS_EXTERN[0].CUSTOMER[0].COMPANY_DATA[0].COMPANY[0].CMDS_EI_COMPANY[0].DATA[0].ALTKN = [this.customerData.data.interfaceNumber]
    //LegalForm?
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].LEGALFORM = [this.customerData.data.legalForm]
    //Salutation
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_CENTRALDATA[0].TITLE_KEY = [this.customerData.data.salutation]
    //Firma / Persons
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].NAME1 = [this.customerData.data.orgaPersons]
    //Additional name
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].NAME2 = [this.customerData.data.additionalName]

    //Contact
    //Street
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].STREET = [this.customerData.data.street]
    //House no.
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].HOUSE_NO = [this.customerData.data.houseNumber]
    //Post box
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].PO_BOX = [this.customerData.data.mailbox]
    //Post box ZIP
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].POSTL_COD2 = [this.customerData.data.zipMailbox]
    //ZIP
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].POSTL_COD1 = [this.customerData.data.zip]
    //City
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].CITY = [this.customerData.data.city]
    //Country
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].COUNTRY = [this.customerData.data.country]
    //Country ISO 
    //this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].COUNTRYISO = [this.customerData.data.country]
    //VALIDFROMDATE
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE = [dateToday]

    //Phone
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].BUS_EI_BUPA_TELEPHONE[0].CONTACT[0].DATA[0].TELEPHONE = [this.customerData.data.phone]
    //Mobile
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].BUS_EI_BUPA_TELEPHONE[1].CONTACT[0].DATA[0].TELEPHONE = [this.customerData.data.mobile]
    //Fax
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].COMMUNICATION[0].FAX[0].FAX[0].BUS_EI_BUPA_FAX[0].CONTACT[0].DATA[0].FAX_NO = [this.customerData.data.fax]
    //Email
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].COMMUNICATION[0].SMTP[0].SMTP[0].BUS_EI_BUPA_SMTP[0].CONTACT[0].DATA[0].E_MAIL = [this.customerData.data.email]


    //Payment

    //TAX id
    this.envelope.IS_EXTERN[0].CUSTOMER[0].CENTRAL_DATA[0].CENTRAL[0].DATA[0].STCD4 = [this.customerData.data.taxId]
    //VAT id
    this.envelope.IS_EXTERN[0].CUSTOMER[0].CENTRAL_DATA[0].CENTRAL[0].DATA[0].STCEG = [this.customerData.data.vatId]
    //Branche
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].INDUSTRY[0].INDUSTRIES[0].BUS_EI_BUPA_INDUSTRYSECTOR[0].DATA_KEY[0].KEYSYSTEM = [this.customerData.data.industryFieldCode]
    //Branchencode
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].INDUSTRY[0].INDUSTRIES[0].BUS_EI_BUPA_INDUSTRYSECTOR[0].DATA_KEY[0].IND_SECTOR = [this.customerData.data.industryField]

    //IBAN
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].BUS_EI_BUPA_BANKDETAIL[0].DATA[0].IBAN = [this.customerData.data.iban]
    //IBAN_FROM_DATE
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].BUS_EI_BUPA_BANKDETAIL[0].DATA[0].IBAN_FROM_DATE = [dateToday]
    //BANKDETAILVALIDFROM
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].BUS_EI_BUPA_BANKDETAIL[0].DATA[0].BANKDETAILVALIDFROM = [dateToday]

    //Terms of payment
    this.envelope.IS_EXTERN[0].CUSTOMER[0].COMPANY_DATA[0].COMPANY[0].CMDS_EI_COMPANY[0].DATA[0].ZTERM = [this.customerData.data.paymentTerm]
    //Remarks?

    return this.envelope;
  }
}

class OrganizationCreditFactory extends CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    super(customerData, ENVELOPE_URL);
  }

  getJSONArgs() {

  }
}

function composeCustomer(customerData) {
  let customerFactory = null
  if (customerData.customerType === 'person') {
    if (customerData.debitCreditType === 'debit') {
      customerFactory = new PersonDebitFactory(customerData, ENVELOPE_URL);
    } else if (customerData.debitCreditType === 'credit') {
      customerFactory = new PersonCreditFactory(customerData, ENVELOPE_URL);
    }
  } else if (customerData.customerType === 'organization') {
    if (customerData.debitCreditType === 'debit') {
      customerFactory = new OrganizationDebitFactory(customerData, ENVELOPE_URL);
    } else if (customerData.debitCreditType === 'credit') {
      customerFactory = new OrganizationCreditFactory(customerData, ENVELOPE_URL);
    }
  }
  return customerFactory.build();
}

async function confirmCustomer(req, res) {
  try {
    const result = await databaseService.checkCustomerConfirmation(req.query.hash);
    const customer = JSON.parse(result[0].customer)
    soapService.sendCustomer(customer, WSDL_URL);
    res.send('<p>Success! The customer was confirmed.</p>');
  } catch (e) {
    console.error(e.stack);
    res.send('<p>Error! The customer was not confirmed.</p>');
  }
}

async function requestCustomer(req, res) {
  try {
    const requestCustomer = req.body.customer;
    let sapCustomer = await composeCustomer(requestCustomer);
    let envelope = sapCustomer.getJSONArgs();
    const emailTo = req.body.decodedAccount.email;
    const hash = cryptoService.generateHash();
    await databaseService.storeCustomer(hash, envelope);
    emailService.sendCustomerConfirmation(emailTo, hash);
    res.json({
      message: 'CONFISSND',
    });
  } catch (e) {
    console.error(e.stack);
    res.status(500).send({
      error: e
    });
  }
}

async function createCustomer(req, res) {
  try {
    const requestCustomer = req.body.customer;
    let sapCustomer = await composeCustomer(requestCustomer);
    let envelope = sapCustomer.getJSONArgs();
    soapService.sendCustomer(envelope, WSDL_URL);
    res.json({
      message: 'CUSISSND',
    });
  } catch (e) {
    console.error(e.stack);
    res.status(500).send({
      error: e
    });
  }
}

function formatDate(date) {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  let year = date.getFullYear()

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

module.exports = {
  PersonDebitFactory: PersonDebitFactory,
  PersonCreditFactory: PersonCreditFactory,
  OrganizationDebitFactory: OrganizationDebitFactory,
  OrganizationCreditFactory: OrganizationCreditFactory,
  confirmCustomer,
  createCustomer,
  requestCustomer
}