const mongoose = require('mongoose');
const img = process.env.BASE_64;
console.log(img);
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
    }
});

const petModal = mongoose.model('pet',petSchema);
module.exports = petModal;