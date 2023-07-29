

const petModel = require('../modals/pet');

function getPetById(req,res){
    const {id} = req.body;
    petModel.findById(id).then((result)=>{
        console.log('found the pet result',result);
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(404).json({error : 'there was some error while getting the pet data', err});
    })
}

module.exports = getPetById;