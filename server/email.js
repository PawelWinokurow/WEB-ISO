var nodemailer = require('nodemailer');
require('dotenv').config()


var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT,
    secure: false,
    proxy: process.env.EMAIL_PROXY,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

/*var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    proxy: process.env.EMAIL_PROXY,
    auth: {
        user: 'paulweinmacher@googlemail.com',
        pass: ''
    }
});*/

exports.sendEmail = function (hash, emailTo) {
    var mailOptions = {
        from: "BayWa",
        to: emailTo,
        subject: 'Mask confirmation',
        html: '<p>Click <a href="http://localhost:3000/confirm?hash=' + hash + '">here</a> to confirm the mask.</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

