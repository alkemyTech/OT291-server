var express = require('express');
var router = express.Router();
const authRouter = require('./authentication');
const categories = require('./categories');
const organization = require('./organization.js');
const user = require('./users.js');
<<<<<<< HEAD
const activities = require('./activities.js');
=======
const news = require('./news')
>>>>>>> a199dd3 ( endpoint to put news ok)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);
router.use('/organization', organization);
router.use('/users', user);
router.use('/categories', category);
router.use('/news/', news )

module.exports = router;
