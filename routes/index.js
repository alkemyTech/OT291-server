var express = require('express');
var router = express.Router();

const organization = require('./organization.js');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/organization', organization);

module.exports = router;
