const soap = require('soap');
const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');


const ENVELOPE_URL = path.join(__dirname, "..", "wsdl", 'envelope.xml');
const WSDL_URL = path.join(__dirname, "..", "wsdl", 'SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outboundService_dev.wsdl');
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
 * @param {string} wsdlUrl path to wsdl
 */
function sendCustomer(customer, wsdlUrl) {
            soap.createClient(WSDL_URL, function (err, soapClient) {
                if (err) {
                    console.log("error", err);
                }
                soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD))
                soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound(customer, function (err, result, raw, headers) {
                    if (err) {
                        //console.log(err);
                    }
                    console.log(JSON.stringify(result))
                })
            });
}

module.exports = { sendCustomer, test };