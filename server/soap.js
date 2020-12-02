var soap = require('soap');
var path = require('path');
require('dotenv').config();

var url = path.join(__dirname, "wsdl", process.env.WSDL_FILENAME);

exports.test = function () {

    var args = {};
    
    soap.createClient(url, function (err, soapClient) {
        if (err) {
            console.log("error", err);
        }
        soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD));
        soapClient.SI_Ping_Outbound(args, function (err, result, raw, headers) {
        //soapClient.SI_ISO_MGB_BAPI_PARTNER_CREATE_outbound(args, function (err, result, raw, headers) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(result))
        })
    })
}


exports.sendMask = function (mask) {
    console.log(mask)
}