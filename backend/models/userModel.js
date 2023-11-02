const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    defaultImage:{public_id: {type: String, required: false}, url:{type: String, required: true}},
    bio:{type: String, required: false},
    gradYear:{type: String, required: true},
})

module.exports = User = mongoose.model('user', userSchema);