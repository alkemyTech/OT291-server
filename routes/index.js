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
const testimonialsRouter = require('./testimonials');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns and Render a object.
 *     description: Exaple swagger
 *     tags:
 *       - Home
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: { title: 'Express' }
 *
 */
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
router.use('/testimonials', testimonialsRouter);
module.exports = router;
