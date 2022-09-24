const express = require('express');
const router = express.Router();
const News = require('../controllers/news');
const ValidationErrors = require('../middlewares/validationErrors');
const RoleMiddleware = require('../middlewares/verify-role');
const putNewsSchema = require('../schemas/news');

router.put(
  '/:id',
  RoleMiddleware.isAdminRole,
  putNewsSchema,
  ValidationErrors.validateSchema,
  News.putNew
);

module.exports = router;