var nodemailer = require('nodemailer');
var config = require('./config');


var transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    proxy: "http://winokurowp:baywsPswd@proxy.intranet.ri-solution.com:8080",
    auth: {
        user: config.email.auth.username,
        pass: config.email.auth.password
    }
});

/*var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    proxy: "http://winokurowp:Trombo8919@proxy.intranet.ri-solution.com:8080",
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

