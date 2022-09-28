var express = require('express');
var router = express.Router();

const slideIdSchema = require('../schemas/slides');
const ValidationErrors = require('../middlewares/validationErrors');
const SlidesController = require('../controllers/slider.controller');
const verifyRole = require('../middlewares/verify-role');

router.get(
  '/:id',
  slideIdSchema,
  ValidationErrors.validateSchema,
  SlidesController.getDetails
);

module.exports = router;
