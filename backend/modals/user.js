const mongoose = require('mongoose');
const pfp = process.env.ANO;
// console.log(pfp);
const Schema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique : true
    },
    name:String,
    pwd:String,
    image:{
        type:String,
        required: false,
        default : pfp
    }
});

const userModel = mongoose.model('user',Schema);
module.exports = userModel;
