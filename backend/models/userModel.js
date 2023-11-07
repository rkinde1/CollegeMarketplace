const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    defaultImage:{ type: String, required: false},
    bio:{type: String, required: false},
    gradYear:{type: String, required: true},
    rating:{type: Number, required: false},
    amountOfRatings:{type: Number, required: false},
    otp: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
})

module.exports = User = mongoose.model('user', userSchema);