const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    defaultImage:{type: String, required: true},
    userImage:{type: String, required: false},
})

module.exports = User = mongoose.model('user', userSchema);