var express = require('express');
var router = express.Router();
/* GET home page. */

const deleteUser = require('./users.js');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', deleteUser)

module.exports = router;
