var soap = require('soap');
var path = require('path');
var xml2js = require('xml2js');
var fs = require('fs');

require('dotenv').config();

var WSDL_URL = path.join(__dirname, "wsdl", process.env.WSDL_FILENAME);
//envelope3.xml for test
var ENVELOPE_URL = path.join(__dirname, "wsdl", 'envelope.xml');
//process.env.http_proxy = 'http://proxy.intranet.ri-solution.com:8080';
exports.test = function () {
    let request = require('request');
    let request_with_defaults = request.defaults({
        'proxy': process.env.http_proxy,
        'timeout': 5000,
        'connection': 'keep-alive'
    });
    let soap_client_options = {
        'request': request_with_defaults
    };

    fs.readFile(ENVELOPE_URL, function (err, data) {
        xml2js.parseString(data, function (err, args) {
            console.log(args)
            soap.createClient(WSDL_URL, soap_client_options, function (err, soapClient) {
                if (err) {
                    console.log("error", err);
                }
                var password = String.raw`${process.env.SOAP_PASSWORD}`
                //console.log('raw password: ', password)
                //console.log('password: ', process.env.SOAP_PASSWORD)
                //console.log(password === process.env.SOAP_PASSWORD)
                soapClient.setSecurity(new soap.BasicAuthSecurity(process.env.SOAP_USER, password))
                //var description = soapClient.describe()
                //console.log(description)
                soapClient.SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound(args, function (err, result, raw, headers) {
                    if (err) {
                        //console.log(err);
                    }
                    console.log(JSON.stringify(result))
                })
            });
        });
    });

}

exports.test_xml = function () {
    console.log(process.env.SOAP_PASSWORD)
    var request = require('request');
    var ENVELOPE_URL = path.join(__dirname, "wsdl", 'soapUI_envelope.xml');
    fs.readFile(ENVELOPE_URL, function (err, xml) {

        var options = {
            url: 'https://sapinterfaces-dev.baywa.com/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_ISO_Webformular&receiverParty=&receiverService=&interface=SI_ISO_MGB_BAPI_MAINTAIN_PARTNER_outbound&interfaceNamespace=urn:baywa:A2A:global:ISOWebFormular?wsdl',
            method: 'POST',
            body: xml,
            headers: {
                'Content-Type': 'text/xml;charset=utf-8',
                'Accept-Encoding': 'gzip,deflate',
                'Content-Length': xml.length,
                'SOAPAction': "http://sap.com/xi/WebService/soap1.1",
                'Authorization': 'VF9TSV9JV0ZfVDpOfStYeUFFXUFdPldjZm5sUjNELWdSeUNIUmJkeWs1XSt3XGY0aGht'
            }
        };

        let callback = (error, response, body) => {

            if (!error && response.statusCode == 200) {
                console.log('Raw result', body);
                var parser = new xml2js.Parser({
                    explicitArray: false,
                    trim: true
                });
                parser.parseString(body, (err, result) => {
                    console.log('JSON result', result);
                });
            };
            console.log('Error: ', response.statusCode, response.statusMessage);
        };
        request(options, callback)
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