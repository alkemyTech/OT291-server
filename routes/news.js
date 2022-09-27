const express = require('express');
const router = express.Router();
const News = require('../controllers/news');
const ValidationErrors = require('../middlewares/validationErrors');
const RoleMiddleware = require('../middlewares/verify-role');
const { getByIdSchema, putNewsSchema } = require('../schemas/news');

router.get(
  '/:id',
  RoleMiddleware.isAdminRole,
  getByIdSchema,
  ValidationErrors.validateSchema,
  News.DetailNew
);
router.put(
  '/:id',
  RoleMiddleware.isAdminRole,
  putNewsSchema,
  ValidationErrors.validateSchema,
  News.putNew
);

module.exports = router;
