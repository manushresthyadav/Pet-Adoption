

const userModel = require('../modals/user');
function getAllUsers(req,res){
    console.log("fetch request");
    const allUsers = userModel.find({}).then((result) => {
      res.status(200).json(result);
    });
}

module.exports = getAllUsers;