const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userModel = require("../modals/user");
console.log("abe ");

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
          } else {
            bcrypt.hash(pwd, Salt, function (err, hash) {
              if (err) {
                console.log("cannot encrypt , there was some error", err);
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
                  }
                });
              }
            });
          }
        });
      }
    });
});

module.exports = router;
