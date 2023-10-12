const nodemailer = require("nodemailer");

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth:{
            user: "cbrown114@students.towson.edu",
            pass: "zdghdgna!",
        },
    });

    return transporter;
};

module.exports = {createMailTransporter};