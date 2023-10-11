const mongoose = require('mongoose');
const User = require('../models/userModel');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const { sendVerificationMail} = require("../utils/sendVerificationMail");

const createToken = (_id)=>{
    const jwtSecretKey = process.env.JWTPRIVATEKEY;
    return jwt.sign((_id),jwtSecretKey, {expiresIn: "3d"});
};



const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (await User.findOne({email})) return res.status(400).json({ message: 'User already exists' });
    try {
        const newUser = await User.create({ firstName, lastName, email, password, emailToken:crypto.randomBytes(64).toString("hex") });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        if (user.password === password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    }
    if (!user) return res.status(400).json({ message: 'User does not exist' });
}

const verifyEmail = async(req, res)=>{
    try{
        const emailToken = req.body.emailToken;

        if(!emailToken) return res.stauts(404).json({message: "EmaiToken not found"});

        const user = await userModel.findOne({emailToken});

        if(user){
            user.emailToken = null;
            user.isVerified = true;

            await user.save();

            sendVerificationEmail(user); 

            const token = ceateToken(user._id);

            res.status(200).json({_id: user._id, name: user.name, email: user.email, token, isVerified: user?.isVerified});
            
        } else res.status(404).json("Email verification failed, invalid token!");
    }catch (error){
        console.log(error);
        res.status(500).json(error.message);
    }
};

module.exports = { register, login, verifyEmail };