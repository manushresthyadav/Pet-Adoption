const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userModel = require('../modals/user');

const protect = asyncHandler(async (req,res,next)=>{
    let token ;
    if(
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ){
        try{
            token = req.headers.authorization.split(" ")[1];  //consider the headers.authorization contianing the token in the form of  : ( Bearer Token ) , splitting to get the desired token that we want 
            const decoded = jwt.verify(token,process.env.JWT_SECRET);

            req.user = await userModel.findById(decoded.id).select('-password'); //basically storing the user inside the req.user . containing all the user details 
            next();
        }
        catch(err){
            res.status(401);
            throw new Error({error : 'Not authorized token failed'});
        }
    }

    if(!token){
        res.status(401);
        throw new Error({error : 'Not authorized , no token found'});
    }
});

module.exports = {protect};