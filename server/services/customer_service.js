const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');


WSDL_URL = path.join(__dirname, '..', process.env.WSDL_FILENAME);

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
        var dateToday = formatDate(new Date());

        //console.log(this.customerData)

        //LegalForm
        //this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].LEGALFORM = [this.customerData.data.legalForm]

        //IBAN
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].BUS_EI_BUPA_BANKDETAIL[0].DATA[0].IBAN = [this.customerData.data.iban]
        //IBAN_FROM_DATE
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].BUS_EI_BUPA_BANKDETAIL[0].DATA[0].IBAN_FROM_DATE = [dateToday]
        //BANKDETAILVALIDFROM
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].BUS_EI_BUPA_BANKDETAIL[0].DATA[0].BANKDETAILVALIDFROM = [dateToday]
        //City
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].CITY = [this.customerData.data.city] 
        //ZIP
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].POSTL_COD1 = [this.customerData.data.zip] 
        //Street
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].STREET = [this.customerData.data.street] 
        //House no.
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].HOUSE_NO = [this.customerData.data.houseNumber] 
        //Country
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].COUNTRY = [this.customerData.data.country]
        //Country ISO 
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].COUNTRYISO = [this.customerData.data.country] 
        //VALIDFROMDATE
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE = [dateToday] 
        //Post box?
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].PO_BOX = [this.customerData.data.mailbox] 
        //Post box ZIP?
        //this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].PO_BOX_REG = [zipMailbox:] 

        //var before = this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE
        //console.log(`before: ${before}`)
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE = [dateToday] 
        
        //var after = this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE
        //console.log(`after: ${after}`)
        return this.envelope
    }
}

class OrganizationCreditFactory extends CustomerFactory {
    constructor(customerData, ENVELOPE_URL) {
        super(customerData, ENVELOPE_URL);
    }

    getJSONArgs() {

    }
}

function confirmCustomer(req, res) {
    databaseService.checkConfirmation(req.query.hash)
      .then(result => {
        const customer = JSON.parse(result[0].customer)
        soapService.sendCustomer(customer, WSDL_URL);
        res.send('<p>Success! The customer was confirmed.</p>');
      })
      .catch(() => {
        res.send('<p>Error! The customer was not confirmed.</p>');
      });
  }

function createCustomer(req, res) {
    function composeCustomer(customerData) {
      var customerFactory = null
      if (customerData.customerType === 'person') {
        if (customerData.debitCreditType === 'debit') {
          customerFactory = new customerService.PersonDebitFactory(customerData, ENVELOPE_URL);
        } else if (customerData.debitCreditType === 'credit') {
          customerFactory = new customerService.PersonCreditFactory(customerData, ENVELOPE_URL);
        }
      } else if (customerData.customerType === 'organization') {
        if (customerData.debitCreditType === 'debit') {
          customerFactory = new customerService.OrganizationDebitFactory(customerData, ENVELOPE_URL);
        } else if (customerData.debitCreditType === 'credit') {
          customerFactory = new customerService.OrganizationCreditFactory(customerData, ENVELOPE_URL);
        }
      }
      return customerFactory.build();
    }
    let customerData = req.body.customer;

    composeCustomer(customerData).then(
      sapCustomer => {
        var envelope = sapCustomer.getJSONArgs();
        var envelope = JSON.stringify(sapCustomer.getJSONArgs());
        if (customerData.isDirect) {
          soapService.sendCustomer(envelope, WSDL_URL);
        } else {
          const hash = cryptoService.generateHash();
          //TODO Promise resolution
          databaseService.storeCustomer(hash, envelope).then();

          const message = {
            from: "BayWa",
            to: emailTo,
            subject: 'Customer confirmation',
            html: '<p>Click <a href="http://localhost:3000/confirm?hash=' + hash + '">here</a> to confirm the customer.</p>'
          };

          emailService.sendEmail(message);
        }
        res.json({
          ok: true
        });
      }
    );
  }

function formatDate(date) {
    var month = '' + (date.getMonth() + 1)
    var day = '' + date.getDate()
    var year = date.getFullYear()

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
    confirmCustomer, createCustomer
}