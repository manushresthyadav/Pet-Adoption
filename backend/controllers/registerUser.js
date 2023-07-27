
const userModel = require('../modals/user');
const bcrypt = require('bcrypt');
function registerUser(req,res){

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

}


module.exports = registerUser;