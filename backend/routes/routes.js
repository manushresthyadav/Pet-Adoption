const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    const json = {
        name: "manushresth",
        lastname: "yadav"
    }
    res.status(200).json(json);
})

router.post('/',(req,res)=>{
    const details = req.body;
    console.log(details);
    res.status(200).send('posted');
})

module.exports = router;
