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
<<<<<<< HEAD
router.use('/activities' , activities )
=======
router.use('/categories', category);
>>>>>>> b5679d3e1638f14264e58fd3bb84a795af395492

module.exports = router;
