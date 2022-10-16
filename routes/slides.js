const express = require('express');
const router = express.Router();
const { slideIdSchema } = require('../schemas/slides');
const ValidationErrors = require('../middlewares/validationErrors');
const SlidesController = require('../controllers/slider.controller');
const RoleMiddleware = require('../middlewares/verify-role');
const verifyRole = require('../middlewares/verify-role');
router.get('/', verifyRole.isAdminRole, SlidesController.getSlides);

router.get(
  '/:id',
  slideIdSchema,
  ValidationErrors.validateSchema,
  verifyRole.isAdminRole,
  SlidesController.getDetails
);

router.delete(
  '/:id',
  slideIdSchema,
  ValidationErrors.validateSchema,
  verifyRole.isAdminRole,
  SlidesController.deleteSlide
);

router.post('/', RoleMiddleware.isAdminRole, SlidesController.postSlide);

module.exports = router;
