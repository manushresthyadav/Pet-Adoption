const route = require('./routes/routes');
const { default: mongoose, mongo } = require('mongoose');
const express = require('express');

require('dotenv').config(); //import the dotenv package to get the data and include the dotenv file inside your gitignore to protect the important information from leaking 


const app = express();
const mongo_url = process.env.MONGO_URL; //got the mongo db url to connect our database
const port = process.env.PORT;

app.use('/def/',route);

mongoose.connect(mongo_url).then(()=>{ //connceted the database 
    app.listen(port,()=>{  //after connecting the database we need to listen for any changes made to our port
        console.log('listening for any changes made at port ', + port);
    }) 
})




