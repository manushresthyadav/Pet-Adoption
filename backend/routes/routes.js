const express = require("express");

const bcrypt = require("bcryptjs");
const router = express.Router();
const userModel = require("../modals/user");

const util = require("util");
const crypto = require("crypto");
const bodyParser = require("body-parser");
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

router.post("/login", (req, res) => {
  const { name, email, pwd } = req.body;

  userModel
    .findOne({
      name: name,
      email: email,
    })
    .then((result) => {
      if(result==null){
        res.status(404).json({msg: 'no user found, please check your credentials properly'});
      }else{
        console.log(result.pwd);
      const [hashed, Salt] = result.pwd.split(".");
const login = async function(){
  console.log(pwd);
 
  bcrypt.compare(pwd,result.pwd,function(err,isValid){
    if (isValid) {
      res.status(200).json(result);
      
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
