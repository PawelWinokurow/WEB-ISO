var soap = require('soap');
var path = require('path');
var xml2js = require('xml2js');
var fs = require('fs');

require('dotenv').config();

var WSDL_URL = path.join(__dirname, "wsdl", process.env.WSDL_FILENAME);
//envelope.xml for test
var ENVELOPE_URL = path.join(__dirname, "wsdl", 'envelope.xml');
exports.test = function () {

    fs.readFile(ENVELOPE_URL, function (err, data) {
        xml2js.parseString(data, function (err, args) {
            //console.log(args.ENVELOPE)
            soap.createClient(WSDL_URL, function (err, soapClient) {
                if (err) {
                    console.log("error", err);
                }
                soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD))
                //var description = soapClient.describe()
                //console.log(description)
                soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound(args.ENVELOPE, function (err, result, raw, headers) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(JSON.stringify(result))
                })
            });
        });
    });

}

/**
 * Sends mask to the SAP server.
 * @param {object} mask Customer mask
 */
exports.sendMask = function (envelope) {
    soap.createClient(WSDL_URL, function (err, soapClient) {
        if (err) {
            console.log("error", err);
        }
        soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD))
        soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound(envelope, function (err, result, raw, headers) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(result))
        })
    });

}