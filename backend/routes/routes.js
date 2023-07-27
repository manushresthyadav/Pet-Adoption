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
const jwt_secret = process.env.JWT_SECRET; 
console.log(jwt_secret);
console.log(protect);
const asyncHandler = require('express-async-handler');
//importing controller functions
const registerUser = require('../controllers/registerUser');
const getAllUsers = require('../controllers/getAllUsers');
const loginUser = require('../controllers/loginUser');
const getUserById = require('../controllers/getUserById');
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
module.exports = router;
