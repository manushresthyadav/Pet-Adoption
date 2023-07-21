const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    const json = {
        name: "manushresth",
        lastname: "yadav"
    }
    res.status(200).json(json);
})

module.exports = router;
