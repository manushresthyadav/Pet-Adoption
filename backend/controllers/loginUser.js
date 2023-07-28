

const userModel = require('../modals/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt_secret = process.env.JWT_SECRET;
 function loginUser(req,res){
    // console.log('bhai wtf is happening ');
    const { name, email, pwd } = req.body;
    // console.log(name,email,pwd);
    // console.log(req.headers.authorization);
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
  const login =  function(){
    // console.log(pwd);
   
    bcrypt.compare(pwd,result.pwd,function(err,isValid){ //isMatch or isValid , same operations to check whether the hashed password is the same pwd generated from the given user pwd.
      if (isValid) {
        // console.log('oyee paaapji')
        const token = jwt.sign(
          {_id : result._id},
          jwt_secret, //this is the secret which when combined with payload and header has to generate signature , if it does then the user is given the permission to acceess whatever resource it is trying to access else he/she is denied .
          {expiresIn : "7d"}
        );
        
        const decoded = jwt.verify(token,jwt_secret);
        //this is how you decode the jwt token , and get the mongo db id , if you have used that id as the payload part during the signing of the token.        
        // console.log(decoded._id) //gives the mongo db id
        // console.log({...result,token});
        res.status(200).json({...result,token:token});
        
      } else {
        res.status(404).json(err);
      }
    })
    
  }
     login();  
        }
        
      });
}

module.exports = loginUser;