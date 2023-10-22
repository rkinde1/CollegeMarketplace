const mongoose = require('mongoose');
const Item = require('../models/itemModel');
const cloudinary = require('../utils/cloudinary')


const createItem = async (req, res) => {
    const { itemName, itemDescription, itemPrice, itemCategory, itemQuantity, sellerEmail, image } = req.body;
    try {
        const result = await cloudinary.uploader.upload(image,{
            folder: "items",
        })
        const newItem = await Item.create({ itemName, itemDescription, itemPrice, itemCategory, itemQuantity, sellerEmail, image:{
            public_id: result.public_id,
            url: result.secure_url,
        } });
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