var soap = require('soap');
var path = require('path');
var request = require('request');

const PROXY_URL = 'http://proxy.intranet.ri-solution.com:8080'

process.env.http_proxy = PROXY_URL

//var url = path.join(__dirname, "wsdl", "SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundService_dev.wsdl");
var url = path.join(__dirname, "wsdl", "SI_Ping_OutboundService.wsdl");
//url = 'http://www.dneonline.com/calculator.asmx?wsdl'
var username = "T_SI_MONPING"
var password = "a09KIqg?9ofO"
//url = 'http://localhost:8088/mockSI_Ping_OutboundBinding?wsdl'

//var username = "T_SI_IWF_T"
//var password = "N}+XyAE]A]>WcfnlR3D-gRyCHRbdyk5]+w\\f4hhm"

var auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");

exports.test = function () {

    var args = {};
    /*
    var request_with_defaults = request.defaults({
        'proxy': PROXY_URL,
        'timeout': 5000,
        'connection': 'keep-alive'
    })
    var options = {
        'request': request_with_defaults
    }*/
    
    soap.createClient(url, function (err, soapClient) {
        if (err) {
            console.log("error", err);
        }
        soapClient.setSecurity(new soap.BasicAuthSecurity(username, password));
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