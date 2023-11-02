const mongoose = require('mongoose');
const User = require('../models/userModel');
const cloudinary = require('../utils/cloudinary');

//error here
const register = async (req, res) => {
    const { firstName, lastName, email, password, gradYear } = req.body;
    if (await User.findOne({email})) return res.status(400).json({ message: 'User already exists' });
    try {
        const newUser = await User.create({ firstName, lastName, email, password,gradYear });
        newUser.defaultImage.url = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fgray-avatar-icon-vector-illustration_276184-163.jpg&tbnid=MYlyFWsXnNO1WM&vet=12ahUKEwjAjLnFtKOCAxV4BGIAHcRdCoMQMygCegQIARB3..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fdefault-user&docid=X0pEsL5m10xz0M&w=626&h=626&q=default%20user%20image&ved=2ahUKEwjAjLnFtKOCAxV4BGIAHcRdCoMQMygCegQIARB3";
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
    const { email, userImage} = req.body;
    try{
        const result = await cloudinary.uploader.upload(userImage, {
            folder: "profileIcon",
            crop: "scale",
        })

        const user =await User.findOne({email});

        user.defaultImage.public_id =  result.public_id;
        user.defaultImage.url = result.secure_url;
       
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