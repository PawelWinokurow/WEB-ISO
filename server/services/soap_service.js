const soap = require('soap');

/**
 * Sends customer to the PI/PO.
 * @param {object} customer  
 * @param {string} wsdlUrl path to wsdl
 */
function sendCustomer(customer, wsdlUrl) {
        soap.createClient(wsdlUrl, function (err, soapClient) {

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

module.exports = { sendCustomer };