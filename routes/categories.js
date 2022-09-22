var express = require('express');
var router = express.Router();
const CategoriesController = require('../controllers/categories');

router.post('/', CategoriesController.post);

module.exports = router;
