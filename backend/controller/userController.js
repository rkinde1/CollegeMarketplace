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
    if (!user) return res.status(400).json({ message: 'User does not exist' });
    if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });
    res.status(200).json({ message: 'Success' });
}

module.exports = { register, login };