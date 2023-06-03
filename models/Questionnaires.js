const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionnairesSchema=new Schema({
    selectionOne:{
        type:String
    },
    selectionTwo:{
        type:String
    },
    selectionThree:{
        type:String
    },
    question:{
        type:String
    },
    category:{
        type:String
    },
    
})

const Questionnaires=mongoose.model('questionnaires',questionnairesSchema)
module.exports=Questionnaires;