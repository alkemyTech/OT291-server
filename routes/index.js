var express = require('express');
var router = express.Router();
const authRouter = require('./authentication');
const categories = require('./categories');
const RoleMiddleware = require("../middlewares/verify-role")
const organization = require('./organization.js');
const news = require('./news');
const user = require('./users.js');
const activities = require('./activities.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);
router.use('/organization', organization);
router.use('/news',news);
router.use('/users', user);
router.use('/activities' , activities )
router.use('/categories', categories);


module.exports = router;
