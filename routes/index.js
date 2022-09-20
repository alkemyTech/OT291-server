var express = require('express');
const { ValidatejWtUser } = require('../middleware/validateTokenUser');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/singup', ValidatejWtUser.decryptTokenUser(), (req, res) => {


res.send('prueba validate')

})

module.exports = router;
