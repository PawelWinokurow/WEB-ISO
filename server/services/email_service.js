var nodemailer = require('nodemailer');
require('dotenv').config()

/**
 * Sends emails.
 * @param  {string} hash Hash allows to identificate the requestor
 * @param  {string} emailTo Email of the requestor
 */
exports.sendEmail = function (hash, emailTo) {

    emailOptions = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'paulweinmacher@googlemail.com',
            pass: 'Tromboman8919'
        }
    }
    
    if (process.env.HTTP_PROXY != undefined) {
        emailOptions.proxy = process.env.EMAIL_PROXY;
    }
    var transporter = nodemailer.createTransport(emailOptions);


    var message = {
        from: "BayWa",
        to: emailTo,
        subject: 'Mask confirmation',
        html: '<p>Click <a href="http://localhost:3000/confirm?hash=' + hash + '">here</a> to confirm the mask.</p>'
    };

    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

