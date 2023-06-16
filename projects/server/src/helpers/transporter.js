const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gmedsnial@gmail.com",
        pass: "alyiofvwehatvtrn",
    },
});

module.exports = transporter;