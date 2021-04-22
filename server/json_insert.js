const config = require('dotenv').config({
    path: './config.env'
})
const soap = require('soap');
const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');

const createClient = util.promisify(soap.createClient);
const ENVELOPE_URL = path.join(process.cwd(), "wsdl", 'envelope.xml');
const WSDL_URL = path.join(process.cwd(), "wsdl", process.env.WSDL_FILENAME);


function pReadXML() {
    return new Promise((resolve, reject) => {
        fs.readFile(ENVELOPE_URL, (err, data) => {
            xml2js.parseString(data, (err, args) => {
                resolve(args.ENVELOPE);
            });
        });
    });
}

async function test() {
    try {

        var xml = await pReadXML();
        const soapClient = await createClient(WSDL_URL);
        soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD))
        const soapRequest = util.promisify(soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound);
        const result = await soapRequest(xml);
        console.log(result)
    } catch (e) {
        console.log(e)
    }

}

test()