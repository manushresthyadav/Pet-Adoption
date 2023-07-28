
const mongoose = require('mongoose');
const partnerSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    origin : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    
})