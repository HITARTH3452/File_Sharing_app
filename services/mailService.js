const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
})

module.exports = transport;