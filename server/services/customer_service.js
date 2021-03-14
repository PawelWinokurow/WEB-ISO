const xml2js = require('xml2js');
const fs = require('fs');

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
    OrganizationCreditFactory: OrganizationCreditFactory
}