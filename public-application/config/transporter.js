var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    service: 'gmail',
    auth: {
        user: "praproject2022@gmail.com",
        pass: "ilovepra2022"
    },
    secure: true
});

module.exports = transporter;