const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const sendPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS, // Enter your gmail account
            pass: process.env.EMAIL_PASSWORD // Enter your gmail password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS, // Enter your gmail account
        to: email,
        subject: "Password Reset Link",
        text: `http://localhost:3000/reset_password/${user._id}/${token}`
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

const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            console.log(err);
            res.status(401).json({ message: 'Incorrect or expired link' });
        } else {
            const user = await User.findById(id);
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({ message: 'Password reset successful' });
        }
    });
}

module.exports = {sendPasswordResetEmail, resetPassword};