const soap = require('soap');
const path = require('path');
const xml2js = require('xml2js');
const fs = require('fs');

//envelope.xml for test
const ENVELOPE_URL = path.join(__dirname, "wsdl", 'envelope2.xml');

function test(wsdlUrl) {

    fs.readFile(ENVELOPE_URL, function (err, data) {
        xml2js.parseString(data, function (err, args) {
            //console.log(args.ENVELOPE)
            soap.createClient(wsdlUrl, function (err, soapClient) {
                if (err) {
                    console.log("error", err);
                }
                soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD))
                let description = soapClient.describe()
                console.log(description)
                soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound(args.ENVELOPE, function (err, result, raw, headers) {
                    if (err) {
                        //console.log(err);
                    }
                    //console.log(JSON.stringify(result))
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
function sendCustomer(envelope, wsdlUrl) {
    soap.createClient(wsdlUrl, function (err, soapClient) {
        if (err) {
            console.log("error", err);
        }
        soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD))
        soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound(envelope, function (err, result, raw, headers) {
            if (err) {
                //console.log(err);
            }
            //console.log(JSON.stringify(result))
        })
    });
}

module.exports = { sendCustomer, test };