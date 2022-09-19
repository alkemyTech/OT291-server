var express = require('express');
var router = express.Router();
/* GET home page. */

const user = require('./users.js');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', user);

module.exports = router;
