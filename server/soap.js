const soap = require('soap');
const path = require('path');

//var url = path.join(__dirname, "wsdl", "SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundService_dev.wsdl");
var url = path.join(__dirname, "wsdl", "SI_Ping_OutboundService.wsdl");

var username = "T_SI_MONPING"
var password = "a09KIqg?9ofO"

var username = "T_SI_IWF_T"
var password = "N}+XyAE]A]>WcfnlR3D-gRyCHRbdyk5]+w\f4hhm"

var auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");



exports.test = function(){
    console.log(auth)
    var args = {Ping: ""};
    soap.createClient(url, function(err, client) {
    //soap.createClient(url, { wsdl_headers: { Authorization: auth } },  function(err, client) {
        if (err) throw err;
        client.addHttpHeader('Authorization', auth);
        client.SI_Ping_Outbound("", function(err, result) {
            if (err) throw err;
        //client.SI_ISO_MGB_BAPI_PARTNER_CREATE_outbound(args, function(err, result) {
            console.log("in")
            console.log(err);
            console.log(result);
        });
    });
}


exports.sendMask = function (mask){
    console.log(mask)
}
