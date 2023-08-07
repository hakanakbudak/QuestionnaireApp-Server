
const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const questionnairesSchema = new Schema({
    selectionOne: {
        type: String
    },
    selectionTwo: {
        type: String
    },
    selectionThree: {
        type: String
    },
    question: {
        type: String
    },
    category: {
        type: String
    },
    questionnaireDate: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required:true
    },
    

})

const Questionnaires = mongoose.model('questionnaires', questionnairesSchema)
module.exports = Questionnaires;