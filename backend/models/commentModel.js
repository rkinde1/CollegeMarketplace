const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentDescription: {type: String},
    date: { type: Date, default: Date.now },
    posterEmail: { type: String},
    userFor: {type: String}
})

module.exports = Item = mongoose.model('comment', commentSchema);