const mongoose = require('mongoose');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');

const createComment = async (req, res) => {
    const { commentDescription, posterEmail, newRating, userFor} = req.body;
    const email = userFor;
  
    var part1;
    var rating;
    var newRatingCalc;

    try{

        const user = await User.findOne({email}); 

        user.amountOfRatings++;        
    
        part1 = (parseFloat(user.rating) + parseFloat(newRating));
        user.rating = part1/ user.amountOfRatings;       
        user.rating = user.rating.toFixed(1);

        await user.save();
        const newComment = await Comment.create({ commentDescription, posterEmail, userFor, newRating});
        await newComment.save();
        res.status(200).json({ message: 'Comment created successfully' });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error changing rating' });
    }
}

const viewComment = async (req, res) => {
    const {userFor} = req.body;
    try {
        const comments = await Comment.find({userFor : userFor});
        res.status(200).json({comments});
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