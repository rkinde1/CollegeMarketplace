const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    defaultImage:{public_id: "Profile/ocriia9h6i6wd3t94zdi", url:"https://res.cloudinary.com/dt5nkkekl/image/upload/v1699319819/Profile/ocriia9h6i6wd3t94zdi.png"},
    bio:{type: String, required: false},
    gradYear:{type: String, required: true},
})

module.exports = User = mongoose.model('user', userSchema);