const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SelectionEnum = Object.freeze({
  A: 1,
  B: 2,
  C: 3,
});

const questionnaireVoteSchema = new mongoose.Schema({
  questionnaireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questionnaires',
    //required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true,
  },
  selectionId: {
    type: Number,
    required: true,
    enum: Object.values(SelectionEnum),
  },
  
});

const QuestionnaireVote = mongoose.model('QuestionnaireVotes', questionnaireVoteSchema);
module.exports = QuestionnaireVote;

