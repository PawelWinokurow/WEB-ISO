const nodemailer = require('nodemailer');

exports.transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: 'f4f2f215cc54d0',
       pass: 'fb5bc5d739aae5'
    }
});