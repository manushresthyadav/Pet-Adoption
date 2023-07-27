

const userModel = require('../modals/user');
function getUserById(req,res){
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
}

module.exports = getUserById;