const mongoose = require('mongoose');
const User = require('../models/userModel');

//error here
const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (await User.findOne({email})) return res.status(400).json({ message: 'User already exists' });
    try {
        const newUser = await User.create({ firstName, lastName, email, password });
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
    const {email, userImage, defaultImage} = req.body;
    const user = awaitUser.findOne({email});
    if(user){
        if(!userImage) {
            res.status(200).json(user.email, user.firstName, user.lastName, user.image);
            return
        }else{
            user.defaultImage =userImage;
            await user.save();
            res.status(200).json(user.email, user.firstName, user.lastName, user.image);
            return
        }
    }
}

module.exports = { register, login, profile};