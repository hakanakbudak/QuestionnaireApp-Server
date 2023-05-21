const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema=new Schema({
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

const UserInfo=mongoose.model('UserInfo',userInfoSchema)
module.exports=UserInfo;