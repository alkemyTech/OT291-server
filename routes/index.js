var express = require('express');
var router = express.Router();
const authRouter = require('./authentication');
const category = require('./category');
const organization = require('./organization.js');
const user = require('./users.js');
const activities = require('./activities.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);
router.use('/organization', organization);
router.use('/users', user);
router.use('/activities' , activities )
router.use('/categories', category);


module.exports = router;
