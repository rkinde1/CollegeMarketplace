const mongoose = require('mongoose');
const User = require('../models/userModel');
const cloudinary = require('../utils/cloudinary');

//error here
const register = async (req, res) => {
    const { firstName, lastName, email, password, gradYear } = req.body;
    if (await User.findOne({email})) return res.status(400).json({ message: 'User already exists' });
    try {
        const newUser = await User.create({ firstName, lastName, email, password,gradYear });
        newUser.defaultImage = "https://res.cloudinary.com/dt5nkkekl/image/upload/v1699319819/Profile/ocriia9h6i6wd3t94zdi.png";
        newUser.rating = 0;
        newUser.amountOfRatings = 0;
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
       
    }catch{

    }
}

const uploadBio = async (req, res) => {
    const { email, bio} = req.body;
    const user =await User.findOne({email});
    if(user){
        user.bio = bio;
    }
    else{return res.status(400).json({ message: 'upload failed' });}
}

module.exports = { register, login, profile, uploadIcon, uploadBio, };