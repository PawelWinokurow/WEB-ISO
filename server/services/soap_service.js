var soap = require('soap');
var path = require('path');
var parseString = require('xml2js').parseString;
var fs = require('fs');

require('dotenv').config();

var WSDL_URL = path.join(__dirname, "wsdl", process.env.WSDL_FILENAME);
var ENVELOPE_URL = path.join(__dirname, "wsdl", 'envelope3.xml');

exports.test = function () {

    fs.readFile(ENVELOPE_URL, function (err, data) {
        parseString(data, function (err, args) {

            console.log(args)
            soap.createClient(WSDL_URL, function (err, soapClient) {
                if (err) {
                    console.log("error", err);
                }
                soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD));
                var description = soapClient.describe()
                //console.log(description)
                soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound(args, function (err, result, raw, headers) {
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
exports.sendMask = function (mask) {
    soap.createClient(WSDL_URL, function (err, soapClient) {
        if (err) {
            console.log("error", err);
        }
        console.log(soapClient)
        soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD));
        var description = soapClient.describe()
        /*soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound(mask, function (err, result, raw, headers) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(result))
        })*/
    })

}