var express = require('express');
var router = express.Router();
const authRouter = require('./authentication');
<<<<<<< HEAD
const news = require('./news');
=======
const categories = require('./categories');
>>>>>>> 90a3586d05669d88ef488d7f2e4b3c5dde98af8a
const organization = require('./organization.js');
const user = require('./users.js');
const news = require('./news');
const activities = require('./activities.js');
const contact = require("./contact")
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);
<<<<<<< HEAD
router.use('/news', news);
=======
>>>>>>> 90a3586d05669d88ef488d7f2e4b3c5dde98af8a
router.use('/organization', organization);
router.use('/users', user);
router.use('/activities', activities);
router.use('/categories', categories);
router.use('/contacts',contact);
router.use('/news', news );
module.exports = router;
