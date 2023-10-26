const User = require('../models/userModel');
const nodemailer = require('nodemailer');

sendToken = async (req, res) => {
    
}

sendPasswordResetEmail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS, // Enter your gmail account
            pass: process.env.EMAIL_PASSWORD // Enter your gmail password
        }
    });

    const { email } = req.body;
    const user = await User.findOne({ email });
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS, // Enter your gmail account
        to: email,
        subject: "Password Reset Link",
        text: "Link will be located here"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
    //Here the link should be sent to the user's email
}
