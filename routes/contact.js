const express = require('express');
const {Contact} = require("../models")
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Esta es la ruta de contactos")
})

module.exports = router;
