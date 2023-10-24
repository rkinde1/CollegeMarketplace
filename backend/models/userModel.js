const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
})

module.exports = User = mongoose.model('user', userSchema);