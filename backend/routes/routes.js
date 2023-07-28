const express = require("express");
require('dotenv').config();
const bcrypt = require("bcryptjs");
const router = express.Router();
const userModel = require("../modals/user");
const jwt = require('jsonwebtoken');
const util = require("util");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const protect = require('../middleware/authMiddleware');
const petModal = require('../modals/pet');
const jwt_secret = process.env.JWT_SECRET; 
console.log(jwt_secret);
console.log(protect);
const asyncHandler = require('express-async-handler');
//importing controller functions
const registerUser = require('../controllers/registerUser');
const getAllUsers = require('../controllers/getAllUsers');
const loginUser = require('../controllers/loginUser');
const getUserById = require('../controllers/getUserById');
const { default: mongoose } = require("mongoose");
// const repo = require('./repository')
console.log("abe ");
const scrypt = util.promisify(crypto.scrypt);
router.get("/", (req, res) => {
  const json = {
    name: "manushresth",
    lastname: "yadav",
  };
  res.status(200).json(json);
});

router.post("/", (req, res) => {
  const details = req.body;
  console.log(details);
  res.status(200).send("posted");
});

router.post("/register", (req,res)=>{registerUser(req,res)});

router.get("/register", (req, res) => {getAllUsers(req,res)});


router.post("/get",(req,res)=>{getUserById(req,res)});

router.post("/login", asyncHandler(async(req, res,next) => { const data = loginUser(req,res);}));

router.post("/add-pet",(req,res)=>{ //we will use a authorization restriction allowing only the logged in users to do this task , will be done by invoking the authMiddle ware function. Protect
  const {name, sex , age, image , quality , color , owner_id, breed , address, number, reason} = req.body;
  console.log('inside the add request of pet and the owner is : ', owner_id);

  if(!name || !sex || !age || !image || !color || !address || !number || !reason){
    res.status(404).json({error : 'Please enter all the fields and Submit'});
  }
  console.log(typeof(image));
  const newPet = petModal({
    name : name,
    age: age,
    sex : sex,
    image : image,
    quality : quality,
    color : color,
    owner_id : owner_id,
    breed : breed,
    address : address,
    number : number,
    reason : reason
  });

  newPet.save().then((result)=>{
    console.log('new pet is saved in the database');
    res.status(200).json(newPet);
  }).catch((err)=>{
    res.status(404).json({error: 'there was some error while adding the data'});
  })

})

router.get("/add-pet",(req,res)=>{
  console.log('request to get all the pet details');

  const data = petModal.find({}).then((result)=>{
    console.log('got the data');
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(404).json({error : 'there was some error getting the data from the database'});
  })
})


router.get("/pet-details/:id",(req,res)=>{
  const id = req.params.id
  console.log('You are requesting to get the details of individaul pets ', id);

  const data = petModal.findById(id).then((result)=>{
    console.log('getting the data');
    res.status(200).json(result);
  }).catch((err)=>{
    res.status(404).json({error: 'There was some error while getting the data',err});
  })
})
module.exports = router;
