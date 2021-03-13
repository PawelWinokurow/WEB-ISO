const nodemailer = require('nodemailer');

require('dotenv').config()

/**
 * Sends emails.
 * @param  {object} message message to send
 */
exports.sendEmail = function (message) {
    
    emailOptions = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'paulweinmacher@googlemail.com',
            pass: 'Tromboman8919'
        }
    }
    console.log(process.env.IN_PROXY)
    if (process.env.HTTP_PROXY != undefined) {
        emailOptions.proxy = process.env.EMAIL_PROXY;
    }
    var transporter = nodemailer.createTransport(emailOptions);
    
    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

