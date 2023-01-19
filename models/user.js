const mongoose = require('mongoose');
const uuid = require('uuid');
const validate = require('validate')  //will be use later

const userSchema = mongoose.Schema({
 
    username : {
        type: String,
        required:true
    },
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : {
        type : String,
        required : true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;