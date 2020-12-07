var soap = require('soap');
var path = require('path');
require('dotenv').config();

var url = path.join(__dirname, "wsdl", process.env.WSDL_FILENAME);
//var url = path.join(__dirname, "wsdl", "calculator.wsdl");

exports.test = function () {

    var args = {
        IV_PARTNERCATEGORY: "1",    //1: Person 2: Organization
        IV_PARTNERGROUP: "01",      //01: Debitor/Kreditor
    };
    
    soap.createClient(url, function (err, soapClient) {
        if (err) {
            console.log("error", err);
        }
        console.log(args)
        soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD));
        var description = soapClient.describe()
        //soapClient.SI_Ping_Outbound(args, function (err, result, raw, headers) {
        soapClient.SI_ISO_MGB_BAPI_PARTNER_CREATE_outbound(args, function (err, result, raw, headers) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(result))
        })
    });
}


exports.sendMask = function (mask) {
    console.log(mask)
    soap.createClient(url, function (err, soapClient) {
        if (err) {
            console.log("error", err);
        }
        soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, process.env.SOAP_PASSWORD));
        var description = soapClient.describe()
        console.log(description)
        soapClient.SI_ISO_MGB_BAPI_PARTNER_CREATE_outbound(mask, function (err, result, raw, headers) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(result))
        })
    })

}