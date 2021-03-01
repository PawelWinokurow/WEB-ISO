var xml2js = require('xml2js');
var fs = require('fs');

class MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        this.maskData = maskData
        this.ENVELOPE_URL = ENVELOPE_URL
    }

    build() {
        var promise = new Promise((resolve, reject) => {
            fs.readFile(this.ENVELOPE_URL, (err, data) => {
                xml2js.parseString(data, (err, args) => {
                    this.envelope = args.ENVELOPE
                    resolve(this);
                });
            });
        });
        return promise
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
        console.log(this.maskData)
        //console.log(this.envelope)
        var before = this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].LEGALFORM
        console.log(`before: ${before}`)

        //LegalForm
        this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].LEGALFORM = [this.maskData.data.legalForm]

        var after = this.envelope.IS_EXTERN[0].PARTNER[0].CENTRAL_DATA[0].COMMON[0].DATA[0].BP_ORGANIZATION[0].LEGALFORM
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

module.exports = {
    PersonDebitFactory: PersonDebitFactory,
    PersonCreditFactory: PersonCreditFactory,
    OrganizationDebitFactory: OrganizationDebitFactory,
    OrganizationCreditFactory: OrganizationCreditFactory
}

