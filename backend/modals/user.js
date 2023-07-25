const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique : true
    },
    name:String,
    pwd:String
});

const userModel = mongoose.model('user',Schema);
module.exports = userModel;
