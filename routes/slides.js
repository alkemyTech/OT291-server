const express = require('express');
const router = express.Router();
const {slideIdSchema} = require('../schemas/slides');
const ValidationErrors = require('../middlewares/validationErrors');
const SlidesController = require('../controllers/slider.controller');
const verifyRole = require('../middlewares/verify-role');

router.get('/', verifyRole.isAdminRole, SlidesController.getSlides);

router.get(
  '/:id',
  slideIdSchema,
  ValidationErrors.validateSchema,
  verifyRole.isAdminRole,
  SlidesController.getDetails
);

router.put(
  '/:id',
  verifyRole.isAdminRole,
  slideIdSchema,
  ValidationErrors.validateSchema,
  SlidesController.updateSlide
);

router.delete(
  '/:id',
  slideIdSchema,
  ValidationErrors.validateSchema,
  SlidesController.deleteSlide
);

module.exports = router;
