const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    defaultImage:{ type: String, required: false},
    bio:{type: String, required: false},
    gradYear:{type: String, required: true},
})

module.exports = User = mongoose.model('user', userSchema);