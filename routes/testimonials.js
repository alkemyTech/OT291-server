var express = require('express');
var router = express.Router();

const testimonialsSchema = require('../schemas/testimonials');
const ValidationErrors = require('../middlewares/validationErrors');
const TestimonialController = require('../controllers/testimonial');
const verifyRole = require('../middlewares/verify-role');

router.put(
  '/:id',
  testimonialsSchema,
  ValidationErrors.validateSchema,
  verifyRole.isAdminRole,
  TestimonialController.updateTestimonials
);

module.exports = router;
