var express = require('express');
var router = express.Router();

const organization = require('./organization.js');
const login = require('./login.js')
const user = require('./users.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/organization', organization);
router.use('/users', user);
router.use('/signup', login)

module.exports = router;
