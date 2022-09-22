var express = require('express');
var router = express.Router();
const authRouter = require('./authentication')
const RoleMiddleware = require("../middlewares/verify-role")
const organization = require('./organization.js');
const news = require('./news');
const user = require('./users.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter)
router.use('/organization', organization);
router.use('/news',news);
router.use('/users', user);

module.exports = router;
