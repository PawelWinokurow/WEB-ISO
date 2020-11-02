const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'f4f2f215cc54d0',
        pass: 'fb5bc5d739aae5'
    }
});

exports.sendMail = function(hash) {
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
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

