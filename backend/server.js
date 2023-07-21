require('dotenv').config(); //import the dotenv package to get the data and include the dotenv file inside your gitignore to protect the important information from leaking 

const mongo_url = process.env.MONGO_URL;

console.log(mongo_url);