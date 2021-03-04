var xml2js = require('xml2js');
var fs = require('fs');

class MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        this.maskData = maskData
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

class PersonDebitFactory extends MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        super(maskData, ENVELOPE_URL);
    }

    getJSONArgs() {

    }
}

class PersonCreditFactory extends MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        super(maskData, ENVELOPE_URL);
    }

    getJSONArgs() {

    }
}

class OrganizationDebitFactory extends MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        super(maskData, ENVELOPE_URL);
    }

    getJSONArgs() {
        var dateToday = formatDate(new Date());

        console.log(this.maskData)

        //LegalForm
        //this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].LEGALFORM = [this.maskData.data.legalForm]

        //IBAN
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].BUS_EI_BUPA_BANKDETAIL[0].DATA[0].IBAN = [this.maskData.data.iban]
        //IBAN_FROM_DATE
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].BUS_EI_BUPA_BANKDETAIL[0].DATA[0].IBAN_FROM_DATE = [dateToday]
        //BANKDETAILVALIDFROM
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].BANKDETAIL[0].BANKDETAILS[0].BUS_EI_BUPA_BANKDETAIL[0].DATA[0].BANKDETAILVALIDFROM = [dateToday]
        //City
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].CITY = [this.maskData.data.city] 
        //ZIP
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].POSTL_COD1 = [this.maskData.data.zip] 
        //Street
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].STREET = [this.maskData.data.street] 
        //House no.
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].HOUSE_NO = [this.maskData.data.houseNumber] 
        //Country
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].COUNTRY = [this.maskData.data.country]
        //Country ISO 
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].COUNTRYISO = [this.maskData.data.country] 
        //VALIDFROMDATE
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE = [dateToday] 
        //Post box?
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].PO_BOX = [this.maskData.data.mailbox] 
        //Post box ZIP?
        //this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].PO_BOX_REG = [zipMailbox:] 

        var before = this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE
        console.log(`before: ${before}`)
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE = [dateToday] 
        
        var after = this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].ADDRESS[0].ADDRESSES[0].BUS_EI_BUPA_ADDRESS[0].DATA[0].POSTAL[0].DATA[0].VALIDFROMDATE
        console.log(`after: ${after}`)
        return this.envelope
    }
}

class OrganizationCreditFactory extends MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        super(maskData, ENVELOPE_URL);
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

