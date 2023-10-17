const mongoose = require('mongoose');
const Item = require('../models/itemModel');

const createItem = async (req, res) => {
    const { itemName, itemDescription, itemPrice, itemCategory, itemQuantity, sellerEmail } = req.body;
    try {
        const newItem = await Item.create({ itemName, itemDescription, itemPrice, itemCategory, itemQuantity, sellerEmail });
        await newItem.save();
        res.status(200).json({ message: 'Item created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating item' });
    }
}

const viewItem = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error viewing items' });
    }
}

const deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        await item.remove();
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting item' });
    }

}

module.exports = { createItem, viewItem };