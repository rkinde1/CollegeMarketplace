const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    seller: { type: String, required: true },
    buyer: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    itemId: { type: String, required: true },
    itemName: { type: String, required: true },
    itemImage: { type: String, required: true },
    status: { type: Boolean, default: false , required: true},
    sellerApproved: { type: Boolean, default: false , required: true},
    buyerApproved: { type: Boolean, default: false , required: true},
})

module.exports = Transaction = mongoose.model('transaction', transactionSchema);