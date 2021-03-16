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
            account: 'paulweinmacher@googlemail.com',
            pass: 'Tromboman8919'
        }
    }

    if (process.env.HTTP_PROXY != undefined) {
        emailOptions.proxy = process.env.EMAIL_PROXY;
    }
    let transporter = nodemailer.createTransport(emailOptions);
    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
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

function resetPassword(emailTo, password) {
    const message = {
        from: "WEB-ISO",
        to: emailTo,
        subject: 'New password WEB-ISO',
        html: `<p>Your WEB-ISO password was reset. New WEB-ISO password: ${password}</p>`
    };
    sendEmail(message);
}

function sendCustomerConfirmation(emailTo, hash) {
    const message = {
        from: "BayWa",
        to: emailTo,
        subject: 'Customer confirmation',
        html: `<p>Click <a href="${process.env.HOST}/confirm?hash=${hash}">here</a> to confirm the customer.</p>`
    };
    sendEmail(message);
}

module.exports = { sendCustomerConfirmation, resetPassword, sendNewAccount };