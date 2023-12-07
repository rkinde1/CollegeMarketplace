const mongoose = require('mongoose');
const User = require('../models/userModel');
const cloudinary = require('../utils/cloudinary');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//error here
const register = async (req, res) => {
    const { firstName, lastName, email, password, gradYear } = req.body;
    const OTP = Math.floor(Math.random() * 1050394);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (await User.findOne({email})) return res.status(400).json({ message: 'User already exists' });
    try {
        const newUser = await User.create({ firstName, lastName, email, gradYear, password: hashedPassword, otp: OTP, verified: false  });
        newUser.defaultImage = "https://res.cloudinary.com/dt5nkkekl/image/upload/v1699319819/Profile/ocriia9h6i6wd3t94zdi.png";
        newUser.amountOfRatings = 0;
        newUser.rating = 0;
        newUser.bio ="";
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
        if (user.verified === false) {
            return res.status(403).json({ message: 'User not verified' })
        }
        else if (await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    }
    if (!user) return res.status(400).json({ message: 'User does not exist' });
}

const profile = async(req, res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error getting user' });
    }
}

const uploadIcon = async (req, res) => {
    const {email, userImage} = req.body;
    try{
        const result = await cloudinary.uploader.upload(userImage, {
            folder: "profileIcon",
            crop: "scale",
        })

        const user =await User.findOne({email});

        user.defaultImage = result.secure_url;
        await user.save();
        res.status(200).json({ message: 'upload successful' });
    }catch{

    }
}

const uploadBio = async (req, res) => {
    const { email, bio} = req.body;
    const user = await User.findOne({email});
    if(user){
        console.log("User found");
        user.bio = bio;
        await user.save();
        res.status(200).json({ message: 'upload successful' });
        
    }
    else{return res.status(400).json({ message: 'upload failed' });}
}

const viewSingleProfile = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({email});
        if(user){
            console.log("User found");
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error viewing user' });
    }
}

module.exports = { register, login, profile, uploadIcon, uploadBio, viewSingleProfile};