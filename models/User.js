
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        unique: true,
        type: String
    },
    username: {
        unique: true,
        type: String
    },
    password: {
        type: String
    },
    userBirthDate: {
        type: Date
    },
    userJob: {
        type: String
    },
    userCity: {
        type: String
    },
    userEducation: {
        type: String
    },
})


const User = mongoose.model('User', userSchema);
module.exports = User;