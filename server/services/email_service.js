const nodemailer = require('nodemailer');

/**
 * Sends emails.
 * @param  {object} message message to send
 */
function sendEmail(message) {
    emailOptions = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }

    if (process.env.HTTP_PROXY != undefined) {
        emailOptions.proxy = process.env.EMAIL_PROXY;
    }
    let transporter = nodemailer.createTransport(emailOptions);
    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function sendNewAccount(account) {
    const message = {
        from: "WEB-ISO",
        to: account.email,
        subject: 'WEB-ISO account',
        html: `
        <p>Your WEB-ISO account was created: </p>
        <p>Username: ${account.username}</p>
        <p>Email: ${account.email}</p>
        <p>Password: ${account.password}</p>        
        `
    };
    sendEmail(message);
}

function sendCustomerConfirmation(emailTo, hash) {
    const message = {
        from: "BayWa",
        to: emailTo,
        subject: 'Customer confirmation',
        html: `<p>Click ${process.env.HOST}/customers/confirm?hash=${hash}" to send the customer.</p>`
    };
    sendEmail(message);
}

function sendCustomerConfirmation(emailTo, sapID) {
    const message = {
        from: "BayWa",
        to: emailTo,
        subject: 'Acknowledgement of receipt',
        html: `<p>The customer was successfully received and stored in the SAP system. SAPID: ${sapID}</p>`
    };
    sendEmail(message);
}

function sendPasswordResetLink(emailTo, hash) {
    const message = {
        from: "BayWa",
        to: emailTo,
        subject: 'Pasword reset confirmation',
        html: `<p>Click ${process.env.APP_HOST}/resetpassword?hash=${hash} to reset your password.</p>`
    };
    sendEmail(message);
}

module.exports = { sendCustomerConfirmation, sendNewAccount, sendPasswordResetLink };