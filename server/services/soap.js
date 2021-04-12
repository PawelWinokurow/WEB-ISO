const soap = require('soap');
const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');



const WSDL_URL = path.join(process.cwd(), "wsdl", process.env.WSDL_FILENAME);

const createClient = util.promisify(soap.createClient);

const ENVELOPE_URL = path.join(process.cwd(), "wsdl", 'envelope.xml');
function test() {
    fs.readFile(ENVELOPE_URL, function (err, data) {
        xml2js.parseString(data, function (err, args) {
            soap.createClient(WSDL_URL, function (err, soapClient) {
                if (err) {
                    console.log("error", err);
                }
                soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD))
                var description = soapClient.describe()
                soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound(args.ENVELOPE, function (err, result, raw, headers) {
                    if (err) {
                        //console.log(err);
                    }
                    console.log(JSON.stringify(result))
                })
            });
        });
    });

}

/**
 * Sends customer to the PI/PO.
 * @param {object} customer  
 */
async function sendCustomer(customer) {
    try {
        const soapClient = await createClient(WSDL_URL);
        soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD))
        const soapRequest = util.promisify(soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound);
        const result = await soapRequest(customer);
        return result.EV_BELEGNR;
    } catch (e) {
        throw e;
    }
}

module.exports = { sendCustomer, test };