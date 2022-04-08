var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ekalylivraison@gmail.com',
        pass: 'ekaly123456'
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.sendMail = function sendMail(email, mailContent) {
    var mailOptions = {
        from: 'ekalylivraison@gmail.com',
        to: email,
        subject: mailContent.subject,
        text: mailContent.text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}