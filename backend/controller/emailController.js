const User = require('../models/userModel');
const nodemailer = require('nodemailer');

resetOTP = async (req, res) => {
    const { email } = req.body;
    const OTP = Math.floor(Math.random() * 1050394);
    try {
        const user = await User.findOne({ email: email });
        user.otp = OTP;
        await user.save();
        res.status(200).json({message: user.otp});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating OTP' });
    }
}

verify = async (req, res) => {
    const { email, otp} = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (otp == user.otp) {
            user.verified = true;
            user.updateOne({ otp: 0 });
            await user.save();
            res.status(200).json({ message: 'User verified successfully' });
        }
        else {
            res.status(400).json({ message: 'Incorrect OTP' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error verifying user' });
    }
}

//Maybe delete
checkEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error checking email' });
    }
}

updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            user.password = newPassword;
            await user.save();
            res.status(200).json({ message: 'Password updated successfully' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating password' });
    }
}

sendEmail = async (req, res) => {
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
        subject: 'OTP for password reset',
        text: `Your OTP is ${user.otp}`
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
}

module.exports = { sendEmail, verify, checkEmail, updatePassword, resetOTP};