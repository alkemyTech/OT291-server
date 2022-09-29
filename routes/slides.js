var express = require('express');
var router = express.Router();

const slideIdSchema = require('../schemas/slides');
const ValidationErrors = require('../middlewares/validationErrors');
const SlidesController = require('../controllers/slider.controller');
const RoleMiddleware = require('../middlewares/verify-role');
const verifyRole = require('../middlewares/verify-role');

router.get(
  '/:id',
  slideIdSchema,
  ValidationErrors.validateSchema,
  verifyRole.isAdminRole,
  SlidesController.getDetails
);

router.post('/', RoleMiddleware.isAdminRole, SlidesController.postSlide);

module.exports = router;
