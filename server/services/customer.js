const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const formatDateService = require('./date_format');

const ENVELOPE_URL = path.join(process.cwd(), "wsdl", process.env.ENVELOPE_FILENAME);

class CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    this.customerData = customerData
    this.ENVELOPE_URL = ENVELOPE_URL
    this.dateToday = formatDateService.formatDate(new Date());
    this.dateTodayValidation = formatDateService.formatDateValidation(new Date());
    this.dateValidTo = '99991231000000';
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

  setContactInformation() {
    //Additional name
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].C_O_NAME = [this.customerData.data.additionalName]
    //Street
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].STREET = [this.customerData.data.street]
    //House no.
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].HOUSE_NO = [this.customerData.data.houseNumber]
    //Post box
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].PO_BOX = [this.customerData.data.mailbox]
    //Post box ZIP
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].POSTL_COD2 = [this.customerData.data.zipMailbox]
    //ZIP
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].POSTL_COD1 = [this.customerData.data.zip]
    //City
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].CITY = [this.customerData.data.city]
    //Country
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].COUNTRY = [this.customerData.data.country]
    //Country ISO 
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].COUNTRYISO = [this.customerData.data.country]
    //VALIDFROMDATE
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE = [this.dateToday]

    //Phone
    if (this.customerData.data.phone.length) this.setPhone();
    //Mobile
    if (this.customerData.data.mobile.length) this.setMobile();
    //Fax
    if (this.customerData.data.fax.length) this.setFax();
    //Email
    if (this.customerData.data.email.length) this.setEmail()
  }

  setPhone() {
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[0].CONTACT[0].DATA[0].COUNTRY = 'DE'
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[0].CONTACT[0].DATA[0].COUNTRYISO = 'DE'
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[0].CONTACT[0].DATA[0].TELEPHONE = [this.customerData.data.phone]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[0].CONTACT[0].DATA[0].TEL_NO = [this.customerData.data.phone]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[0].CONTACT[0].DATA[0].CALLER_NO = [this.customerData.data.phone]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[0].CONTACT[0].DATA[0].VALID_FROM = [this.dateTodayValidation]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[0].CONTACT[0].DATA[0].VALID_TO = [this.dateValidTo]
  }

  setMobile() {
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[1].CONTACT[0].DATA[0].COUNTRY = 'DE'
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[1].CONTACT[0].DATA[0].COUNTRYISO = 'DE'
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[1].CONTACT[0].DATA[0].TELEPHONE = [this.customerData.data.mobile]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[1].CONTACT[0].DATA[0].TEL_NO = [this.customerData.data.mobile]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[1].CONTACT[0].DATA[0].CALLER_NO = [this.customerData.data.mobile]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[1].CONTACT[0].DATA[0].VALID_FROM = [this.dateTodayValidation]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].PHONE[0].PHONE[0].item[1].CONTACT[0].DATA[0].VALID_TO = [this.dateValidTo]
  }

  setFax() {
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].FAX[0].FAX[0].item[0].CONTACT[0].DATA[0].COUNTRY = 'DE'
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].FAX[0].FAX[0].item[0].CONTACT[0].DATA[0].COUNTRYISO = 'DE'
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].FAX[0].FAX[0].item[0].CONTACT[0].DATA[0].FAX = [this.customerData.data.fax]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].FAX[0].FAX[0].item[0].CONTACT[0].DATA[0].VALID_FROM = [this.dateTodayValidation]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].FAX[0].FAX[0].item[0].CONTACT[0].DATA[0].VALID_TO = [this.dateValidTo]
  }

  setEmail() {
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].SMTP[0].SMTP[0].item[0].CONTACT[0].DATA[0].COUNTRY = 'DE'
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].SMTP[0].SMTP[0].item[0].CONTACT[0].DATA[0].COUNTRYISO = 'DE'
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].SMTP[0].SMTP[0].item[0].CONTACT[0].DATA[0].E_MAIL = [this.customerData.data.email]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].SMTP[0].SMTP[0].item[0].CONTACT[0].DATA[0].VALID_FROM = [this.dateTodayValidation]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].item[0].DATA[0].COMMUNICATION[0].SMTP[0].SMTP[0].item[0].CONTACT[0].DATA[0].VALID_TO = [this.dateValidTo]
  }

  setPaymentCreditInformation() {
    //TAX id
    this.envelope.IS_EXTERN[0].CUSTOMER[0].CENTRAL_DATA[0].CENTRAL[0].DATA[0].STCD4 = [this.customerData.data.taxId]
    //VAT id
    this.envelope.IS_EXTERN[0].CUSTOMER[0].CENTRAL_DATA[0].CENTRAL[0].DATA[0].STCEG = [this.customerData.data.vatId]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].TAXNUMBER[0].TAXNUMBERS[0].item[0].DATA_KEY[0].TAXNUMBER = [this.customerData.data.vatId]

    //Branche
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].INDUSTRY[0].INDUSTRIES[0].item[0].DATA_KEY[0].KEYSYSTEM = [this.customerData.data.industryFieldCode]
    //Branchencode
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].INDUSTRY[0].INDUSTRIES[0].item[0].DATA_KEY[0].IND_SECTOR = [this.customerData.data.industryField]
    //IBAN
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].item[0].DATA[0].IBAN = [this.customerData.data.iban]
    //IBAN_FROM_DATE
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].item[0].DATA[0].IBAN_FROM_DATE = [this.dateToday]
    //BANKDETAILVALIDFROM
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].item[0].DATA[0].BANKDETAILVALIDFROM = [this.dateToday]

    //Terms of payment
    this.envelope.IS_EXTERN[0].CUSTOMER[0].COMPANY_DATA[0].COMPANY[0].item[0].DATA[0].ZTERM = [this.customerData.data.paymentTerm]
    //Remarks?
    this.envelope.IT_NOTE[0].item = [this.customerData.data.notes]
  }

  setGeneralInformation() {
    //Buchungskreis
    this.envelope.IS_EXTERN[0].CUSTOMER[0].COMPANY_DATA[0].COMPANY[0].item[0].DATA_KEY[0].BUKRS = [this.customerData.data.companyCode]
    //LegalForm
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].LEGALFORM = [this.customerData.data.legalForm]
    //Interface number
    this.envelope.IS_EXTERN[0].CUSTOMER[0].COMPANY_DATA[0].COMPANY[0].item[0].DATA[0].ALTKN = [this.customerData.data.interfaceNumber]

    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_CENTRALDATA[0].PARTNERLANGUAGE = 'D';
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_CENTRALDATA[0].PARTNERLANGUAGEISO = 'DE';
  }

  setPaymentDebitInformation() {
    this.setPaymentCreditInformation();
    //TODO creditlimit
  }

  setGeneralPersonInformation() {
    this.setGeneralInformation();
    //CATEGORY 1 is person, 2 is organization
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_CONTROL[0].CATEGORY = '1';
    //SEARCHTERM1 = NAME1
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_CENTRALDATA[0].SEARCHTERM1 = [this.customerData.data.secondName]
    //Salutation
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_CENTRALDATA[0].TITLE_KEY = [this.customerData.data.salutation]
    //Title
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_PERSON[0].TITLE_ACA1 = [this.customerData.data.title]
    //First name
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_PERSON[0].FIRSTNAME = [this.customerData.data.firstName]
    //Last name
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_PERSON[0].LASTNAME = [this.customerData.data.secondName]
    //Birthdate
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_PERSON[0].BIRTHDATE = [this.customerData.data.birthDate]
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_PERSON[0].CORRESPONDLANGUAGE = 'D'
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_PERSON[0].CORRESPONDLANGUAGEISO = 'DE'
  }

  setGeneralOrganizationInformation() {
    this.setGeneralInformation();
    //CATEGORY 1 is person, 2 is organization
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_CONTROL[0].CATEGORY = '2';
    //SEARCHTERM1 = NAME1
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_CENTRALDATA[0].SEARCHTERM1 = [this.customerData.data.orgaPerson]
    //Salutation
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_CENTRALDATA[0].TITLE_KEY = [this.customerData.data.salutation]
    //Firma / Persons (Name 1)
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].NAME1 = [this.customerData.data.orgaPersons]
    //Additional name (Name 2)
    this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].NAME2 = [this.customerData.data.additionalName]
  }

  stringChop(str, size){
    if (str == null)
       return [];
       str = String(str);
       return size > 0 ? str.match(new RegExp('.{1,' + size + '}', 'g')) : [{LINE: str}];
 }

  setFiles() {
    if (this.customerData.data.files.length) {
      for (let i = 0; i < this.customerData.data.files.length; i++) {
        const file = this.customerData.data.files[i]
        let base64String = file.content.replace(/^data:.*,/, '')

        let lines = this.stringChop(base64String, 1022)
        console.log(lines)
        let file_xml = {
          FILENAME: file.filename,
          CONTENT: [{}],
          FILELENGTH: base64String.length
        }
        file_xml.CONTENT.push({})

        
        for (let i = 0; i <  lines.length; i++) {
          file_xml.CONTENT[0].item[i] = lines[i];
        }
        console.log(lines[0])
        this.envelope.IT_BDS[0].item[i] = file_xml
      } 
    }
  }
}

class PersonDebitFactory extends CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    super(customerData, ENVELOPE_URL);
  }

  getJSONArgs() {
    this.setGeneralPersonInformation();
    this.setContactInformation();
    this.setPaymentDebitInformation();
    //this.setFiles();
    return this.envelope;
  }
}

class PersonCreditFactory extends CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    super(customerData, ENVELOPE_URL);
  }

  getJSONArgs() {
    this.setGeneralPersonInformation();
    this.setContactInformation();
    this.setPaymentCreditInformation();
    ///this.setFiles();
    return this.envelope;
  }
}

class OrganizationDebitFactory extends CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    super(customerData, ENVELOPE_URL);
  }

  getJSONArgs() {
    this.setGeneralOrganizationInformation();
    this.setContactInformation();
    this.setPaymentDebitInformation();
    //this.setFiles();
    return this.envelope;
  }
}

class OrganizationCreditFactory extends CustomerFactory {
  constructor(customerData, ENVELOPE_URL) {
    super(customerData, ENVELOPE_URL);
  }

  getJSONArgs() {
    this.setGeneralOrganizationInformation();
    this.setContactInformation();
    this.setPaymentCreditInformation();
    //this.setFiles();
    return this.envelope;
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


module.exports = {
  PersonDebitFactory: PersonDebitFactory,
  PersonCreditFactory: PersonCreditFactory,
  OrganizationDebitFactory: OrganizationDebitFactory,
  OrganizationCreditFactory: OrganizationCreditFactory,
  composeCustomer
}