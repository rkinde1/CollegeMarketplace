const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String},
    itemDescription: {type: String},
    itemPrice: { type: Number},
    itemImage: { type: String},
    itemCategory: { type: String},
    itemQuantity: { type: Number},
    date: { type: Date, default: Date.now },
    sellerEmail: { type: String}
})

module.exports = Item = mongoose.model('item', itemSchema);