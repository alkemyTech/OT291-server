var express = require('express');
var router = express.Router();
const authRouter = require('./authentication');
const categories = require('./categories');
const organization = require('./organization.js');
const user = require('./users.js');
const news = require('./news');
const activities = require('./activities.js');
const contact = require('./contact');
const slidesRouter = require('./slides');
const backoffice = require('./backoffice');
const testimonialsRouter = require('./testimonials');
const membersRouter = require('./members');
const comments = require('./comments');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);
router.use('/organization', organization);
router.use('/users', user);
router.use('/activities', activities);
router.use('/categories', categories);
router.use('/contacts', contact);
router.use('/news', news);
router.use('/slides', slidesRouter);
router.use('/backoffice', backoffice);
router.use('/testimonials', testimonialsRouter);
router.use('/members', membersRouter);
router.use('/comments', comments);

module.exports = router;
