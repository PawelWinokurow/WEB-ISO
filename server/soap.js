var soap = require('soap');
var path = require('path');
var config = require('./config');

//var url = path.join(__dirname, "wsdl", "SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundService_dev.wsdl");
var url = path.join(__dirname, "wsdl", "SI_Ping_OutboundService.wsdl");


exports.test = function () {


    var args = {};
    
    soap.createClient(url, function (err, soapClient) {
        if (err) {
            console.log("error", err);
        }
        soapClient.setSecurity(new soap.BasicAuthSecurity(config.soap.auth.username, config.soap.auth.password));
        soapClient.SI_Ping_Outbound(args, function (err, result, raw, headers) {
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