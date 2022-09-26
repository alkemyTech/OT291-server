const express = require('express');
const router = express.Router();

const NewsController = require('../controllers/news.js');
const findByIdSchema = require("../schemas/news");
const ValidationErrors = require('../middlewares/validationErrors');
const VerifyRole = require("../middlewares/verify-role")
router.get('/:id', VerifyRole.isAdminRole, findByIdSchema, ValidationErrors.validateSchema, NewsController.findById);

module.exports = router;
