var express = require('express');
var router = express.Router();
const categorySchema = require('../schemas/category');
const ValidationErrors = require('../middlewares/validationErrors');
const CategoriesController = require('../controllers/categories');

router.post(
  '/',
  categorySchema,
  ValidationErrors.validateSchema,
  CategoriesController.post
);

module.exports = router;
