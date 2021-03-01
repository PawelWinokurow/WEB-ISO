var xml2js = require('xml2js');
var fs = require('fs');

class MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        this.maskData = maskData
        this.ENVELOPE_URL = ENVELOPE_URL
    }

    async build() {
        fs.readFile(this.ENVELOPE_URL, (err, data) => {
            console.log(this.ENVELOPE_URL)
            console.log(data)
            xml2js.parseString(data, (err, args) => {
                this.args = args;
                console.log(args);
            });
        });
    }



    createMask() { }
}

class PersonDebitFactory extends MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        super(maskData, ENVELOPE_URL);
    }

    createMask() {

    }
}

class PersonCreditFactory extends MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        super(maskData, ENVELOPE_URL);
    }

    createMask() {

    }
}

class OrganizationDebitFactory extends MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        super(maskData, ENVELOPE_URL);
    }

    createMask() {

    }
}

class OrganizationCreditFactory extends MaskFactory {
    constructor(maskData, ENVELOPE_URL) {
        super(maskData, ENVELOPE_URL);
    }

    createMask() {

    }
}

module.exports = {
    PersonDebitFactory: PersonDebitFactory,
    PersonCreditFactory: PersonCreditFactory,
    OrganizationDebitFactory: OrganizationDebitFactory,
    OrganizationCreditFactory: OrganizationCreditFactory
}

