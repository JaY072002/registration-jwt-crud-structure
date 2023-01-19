const mongoose = require('mongoose');
const uuid = require('uuid');

const adminSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
})

const admin = mongoose.model('Admin', adminSchema);


module.exports = admin;