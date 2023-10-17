const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String},
    description: {type: String},
    price: { type: Number},
    // image: { type: String},
    category: { type: String},
    quantity: { type: Number},
    date: { type: Date, default: Date.now },
    sellerEmail: { type: String}
})

module.exports = Item = mongoose.model('item', itemSchema);