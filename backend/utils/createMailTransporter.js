const nodemailer = require("nodemailer");

const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth:{
            user: "cbrown114@students.towson.edu",
            pass: "HazelGirl2023!",
        },
    });

    return transporter;
};

module.exports = {createMailTransporter};