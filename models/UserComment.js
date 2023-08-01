
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCommentSchema = new Schema({
    comment: {
        type: String
    },
    questionnaireId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'questionnaires',
        required:true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
})

const UserComment = mongoose.model('Comment', userCommentSchema);
module.exports = UserComment;