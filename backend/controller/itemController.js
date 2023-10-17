const mongoose = require('mongoose');
const Item = require('../models/itemModel');

const createItem = async (req, res) => {
    const { name, description, price, image, category, quantity, sellerEmail } = req.body;
    try {
        const newItem = await Item.create({ name, description, price, image, category, quantity, sellerEmail });
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


module.exports = { createItem,viewItem };