var express = require('express');
var router = express.Router();
const authRouter = require('./authentication');

const organization = require('./organization.js');
const user = require('./users.js');
const categories = require('./categories.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);
router.use('/organization', organization);
router.use('/users', user);
router.use('/categories', categories);

module.exports = router;
