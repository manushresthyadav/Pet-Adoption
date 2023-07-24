const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    email:String,
    name:String,
    pwd:String
});

const userModel = mongoose.model('user',Schema);
module.exports = userModel;
