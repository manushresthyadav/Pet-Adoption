const route = require('./routes/routes');
const mongoose = require('mongoose');
const express = require('express');

require('dotenv').config(); //import the dotenv package to get the data and include the dotenv file inside your gitignore to protect the important information from leaking 


const app = express();
const mongo_url = process.env.MONGO_URL; //got the mongo db url to connect our database
const port = process.env.PORT;
const cors = require('cors');
console.log(mongo_url,port);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/def',route);
console.log('hueheu');

mongoose.connect(mongo_url).then(()=>{ //connceted the database 
 console.log('lmao')
        app.listen(port,()=>{  //after connecting the database we need to listen for any changes made to our port
            console.log('listening for any changes made at port ',  port);
        })
    
    
}).catch((err)=>{
    console.log('there was some error while connecting to the server',  err);
})




