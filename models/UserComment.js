
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCommentSchema = new Schema({
    comment: {
        type: String
    },
    
})


const UserComment = mongoose.model('Comment', userCommentSchema);
module.exports = UserComment;