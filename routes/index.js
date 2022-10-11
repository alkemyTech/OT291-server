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
<<<<<<< HEAD
const comments = require('./comment');
=======
const commentsRouter = require('./comments');
>>>>>>> 7aac9ccd89e63a4e913ea38f6f62f5bc5832d983
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
<<<<<<< HEAD
router.use('/comments', comments);
=======
router.use('/posts', commentsRouter);
>>>>>>> 7aac9ccd89e63a4e913ea38f6f62f5bc5832d983
module.exports = router;
