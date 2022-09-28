const express = require('express');
const SlidersController = require('../controllers/slider.controller');
const RoleMiddleware = require('../middlewares/verify-role');
const router = express.Router();

router.get('/', RoleMiddleware.isAdminRole, SlidersController.getSlides);

module.exports = router;
