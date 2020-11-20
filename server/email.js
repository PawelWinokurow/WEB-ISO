var nodemailer = require('nodemailer');
var config = require('./config');

var transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    auth: {
        user: config.email.auth.username,
        pass: config.email.auth.password
    }
});

exports.sendEmail = function (hash, emailTo) {
    console.log(emailTo)
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

