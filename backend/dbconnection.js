const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connection = async () => {
    try {
        await mongoose.connect(process.env.REACT_APP_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection;