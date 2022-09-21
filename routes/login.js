const express = require('express');
const { ValidatejWtUser } = require('../middlewares/validateTokenUser');
const router = express.Router();


router.get('/', ValidatejWtUser.decryptTokenUser, (req, res) => {


res.send('validate user')

});

module.exports = router;
