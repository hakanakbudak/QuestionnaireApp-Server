const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema=new Schema({
    age:{
        type:String
    },
    country:{
        type:String
    },
    city:{
        type:String
    },
    message:{
        type:String
    },
})

const UserInfo=mongoose.model('UserInfo',userInfoSchema)
module.exports=UserInfo;