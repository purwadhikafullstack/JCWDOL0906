const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "cuapcekrek@gmail.com",
        pass: "tbjynhybqnltohkg",
    },
});

module.exports = transporter;