const { default: mongoose, mongo } = require('mongoose');

require('dotenv').config(); //import the dotenv package to get the data and include the dotenv file inside your gitignore to protect the important information from leaking 

const mongo_url = process.env.MONGO_URL; //got the mongo db url to connect our database

mongoose.connect(mongo_url).then(()=>{
    console.log('database is connected');
})