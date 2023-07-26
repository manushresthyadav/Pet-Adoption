const express = require("express");
require('dotenv').config();
const bcrypt = require("bcryptjs");
const router = express.Router();
const userModel = require("../modals/user");
const jwt = require('jsonwebtoken');
const util = require("util");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const jwt_secret = process.env.JWT_SECRET; 
console.log(jwt_secret);
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

router.post("/register", (req, res) => {
  console.log("post the user details request");
  const userEmail = req.body.email;
  const userName = req.body.name;
  const pwd = req.body.pwd;
  userModel
    .findOne({
      email: userEmail,
      name: userName,
      pwd: pwd,
    })
    .then((result) => {
      if (result != null && result.length > 0) {
        console.log("user already exists");
        res.status(300).redirect("/login");
      } else {
        var hashedPwd = "";

        bcrypt.genSalt(10, function (err, Salt) {
          if (err) {
            console.log("there was some error in encrypting the password", err);
            res.status(404).json(err);
          } else {
            bcrypt.hash(pwd, Salt, function (err, hash) {
              if (err) {
                console.log("cannot encrypt , there was some error", err);
                res.status(404).json(err);
              } else {
                hashedPwd = hash;
                console.log("the hashed password is : ", hashedPwd);

                bcrypt.compare(pwd, hashedPwd, function (err, isMatch) {
                  if (isMatch) {
                    console.log("hashed password is", hashedPwd);
                    console.log("normal password is", pwd);

                    console.log(hashedPwd);
                    console.log("creating the user");
                    const newUser = userModel({
                      email: userEmail,
                      name: userName,
                      pwd: hashedPwd,
                    });
                    newUser.save().then((result) => {
                      console.log("new user is added", result);
                      res.status(200).json(result);
                    });
                  } else {
                    console.log(
                      "hashed pwd",
                      hashedPwd + "is not the encryption of",
                      pwd
                    );
                    res.status(400).send('some error while matching the passwords');
                  }
                });
              }
            });
          }
        });
      }
    }).catch((err)=>res.status(404).json(err));
});

router.get("/register", (req, res) => {
  console.log("fetch request");
  const allUsers = userModel.find({}).then((result) => {
    res.status(200).json(result);
  });
});


router.post("/get",(req,res)=>{
  const uid = req.body._id;
  console.log(uid);
  if(!uid){
    res.status(404).json({error : 'some error'});
  }else{
  userModel.findById(uid).then((result)=>{
    if(result!=undefined){
      console.log('the user data is : ' , result);
      res.status(200).json(result);
    }else{
      console.log(result);
      res.status(404).json({error : 'unable to fetch the information , login or register again'})
    }
    
  }).catch((err)=>{
    res.status(404).json({error: err});
  })
}
})
router.post("/login", (req, res) => {
  const { name, email, pwd } = req.body;
  console.log(req.headers.authorization);
  userModel
    .findOne({
      name: name,
      email: email,
    })
    .then((result) => {
      if(result==null){
        res.status(404).json({msg: 'no user found, please check your credentials properly'});
      }else{
       
      const [hashed, Salt] = result.pwd.split(".");
const login = async function(){
  console.log(pwd);
 
  bcrypt.compare(pwd,result.pwd,function(err,isValid){ //isMatch or isValid , same operations to check whether the hashed password is the same pwd generated from the given user pwd.
    if (isValid) {
      const token = jwt.sign(
        {email:result.email,name:result.email},
        jwt_secret, //this is the secret which when combined with payload and header has to generate signature , if it does then the user is given the permission to acceess whatever resource it is trying to access else he/she is denied .
        {expiresIn : "7d"}
      );
      console.log({...result,token});
      res.status(200).json({...result,token:token});
      
    } else {
      res.status(404).json(err);
    }
  })
  
}
   login();  
      }
      
    });
});
module.exports = router;
