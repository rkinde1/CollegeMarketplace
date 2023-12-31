const mongoose = require('mongoose');
const Transaction = require('../models/transactionModel');
const Item = require('../models/itemModel');

//Creates a transaction so that the buyer can see the initiation of the transaction
const createTransaction = async (req, res) => {
    const { seller, buyer, amount, itemId } = req.body;
    const transactionItemId = itemId;
    const newItemId = itemId;
    const transaction = await Transaction.findOne({ seller, buyer, transactionItemId });
    const item = await Item.findById(newItemId);
    //checks if transaction already exists
    if (transaction) {
        return res.status(400).json({ message: 'Transaction already exists' });
    }
    try {
        const newTransaction = await Transaction.create({ seller, buyer, amount, itemId, itemImage: item.itemImage, itemName: item.itemName, status: false, sellerApproved: false, buyerApproved: false });
        await newTransaction.save();
        res.status(200).json({ message: 'Transaction created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating transaction' });
    }
}
const getSellerTransactions = async (req, res) => {
    const { email } = req.body;
    try {
        const transactions = await Transaction.find({ seller: email });
        res.status(200).json({ transactions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error getting transactions' });
    }
}

//returns a list of all transactions
const getBuyerTransactions = async (req, res) => {
    const { email } = req.body;
    try {
        const transactions = await Transaction.find({ buyer: email });
        res.status(200).json({ transactions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error getting transactions' });
    }
}

//Checks whether the buyer and seller have approved the transaction
const completeTransaction = async (req, res) => {
    const { id } = req.body;
    try {
        const transaction = await Transaction.findById(id);
        if (transaction.buyerApproved === false) {
            return res.status(400).json({ message: 'Buyer has not approved transaction' });
        }
        if (transaction.sellerApproved === false) {
            return res.status(400).json({ message: 'Seller has not approved transaction' });
        }
        //Sets the transaction status to true (once status == true, the item on the market should appear offline)
        transaction.status = true;
        await transaction.save(); 
        res.status(200).json({ message: 'Transaction completed successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error completing transaction' });
    }
}

//Approves the transaction for the buyer or seller
const approveTransaction = async (req, res) => {
    const { id, email } = req.body;
    const transaction = await Transaction.findById(id);
    try {
        if (transaction.seller === email) {
            transaction.sellerApproved = true;
        }
        if (transaction.buyer === email) {
            transaction.buyerApproved = true;
        }
        if (transaction.buyer !== email && transaction.seller !== email) {
            return res.status(400).json({ message: 'User is not part of transaction' });
        }
        await transaction.save();
        res.status(200).json({ message: 'Transaction approved successfully' });
    } catch {
        console.log(error);
        res.status(500).json({ message: 'Error approving transaction' });
    }
}

const deleteApproval = async (req, res) => {
    const { id, email } = req.body;
    const transaction = await Transaction.findById(id);
    try {
        if (transaction.seller === email) {
            transaction.sellerApproved = false;
        }
        if (transaction.buyer === email) {
            transaction.buyerApproved = false;
        }
        if (transaction.buyer !== email && transaction.seller !== email) {
            return res.status(400).json({ message: 'User is not part of transaction' });
        }
        await transaction.save();
        res.status(200).json({ message: 'Transaction approved successfully' });
    }
    catch {
        console.log(error);
        res.status(500).json({ message: 'Error approving transaction' });
    }
}

const deleteTransaction = async (req, res) => {
    const { id, email } = req.body;
    const transaction = await Transaction.findById(id);
    try {
        if (!transaction) {
            return res.status(400).json({ message: 'Transaction does not exist' });
        }
        if (transaction.seller !== email && transaction.buyer !== email) {
            return res.status(400).json({ message: 'User is not part of transaction' });
        }
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    }
    catch {
        console.log(error);
        res.status(500).json({ message: 'Error deleting transaction' });
    }
}


module.exports = { createTransaction, getBuyerTransactions, getSellerTransactions, completeTransaction, approveTransaction, deleteApproval, deleteTransaction };

//After the transaction is completed, the stripe payment features should be pulled up
//Only if the transaction.status === true, payment stripe fetch request will appear