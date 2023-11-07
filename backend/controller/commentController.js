const mongoose = require('mongoose');
const Comment = require('../models/commentModel');


const createComment = async (req, res) => {
    const { commentDescription, posterEmail, userFor} = req.body;
    try {
      const newComment = await Comment.create({ commentDescription, posterEmail, userFor});
        await newComment.save();
        res.status(200).json({ message: 'Comment created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating Comment' });
    }
}

const viewComment = async (req, res) => {
    const {userFor} = req.body;
    try {
        const comments = await Comment.findOne(userFor);
        res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error viewing comments' });
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        await comment.remove();
        res.status(200).json({ message: 'comment deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting comment' });
    }

}

module.exports = { createComment, viewComment };