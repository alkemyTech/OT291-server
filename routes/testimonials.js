const express = require('express');
const router = express.Router();
const verifyRole = require('../middlewares/verify-role');

const testimonialController = require('../controllers/testimonial');

router.get('', verifyRole.isAdminRole, testimonialController.getTestimonials);

module.exports = router;
