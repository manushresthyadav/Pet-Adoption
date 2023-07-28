const mongoose = require('mongoose');
const img = process.env.BASE_64;
console.log('base 64 is ' ,img);
const petSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    age : {
        type: Number,
        required: true
    },
    image : {
        type : String,
        required : true,
        default : img
    },
    color : {
        type : String,
        required: true
    },
    sex : {
        type : String,
        required: true
    },
    quality : {
        type : String,
        required : false
    },
    owner_id : {
        type: String,
        required: true
    },
    breed : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    number : {
        type: Number,
        required: true
    },
    reason : {
        type: String,
        required: true
    }
});

const petModal = mongoose.model('pet',petSchema);
module.exports = petModal;