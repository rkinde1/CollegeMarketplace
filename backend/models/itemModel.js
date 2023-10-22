const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String},
    itemDescription: {type: String},
    itemPrice: { type: Number},
    itemImage: { 
       public_id:{
        type: String,
        required: true
       },
        url:{
            type: String,
            required: true
        }},
    itemCategory: { type: String},
    itemQuantity: { type: Number},
    date: { type: Date, default: Date.now },
    sellerEmail: { type: String}
})

module.exports = Item = mongoose.model('item', itemSchema);