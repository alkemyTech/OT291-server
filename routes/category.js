const express = require('express');
const router = express.Router();

const CategoriesController = require('../controllers/categories');
const RoleMiddleware = require('../middlewares/verify-role');
const ValidationErrors = require('../middlewares/validationErrors');
const deleteSchema = require('../schemas/categories');

router.delete(
  '/:id',
  deleteSchema,
  ValidationErrors.validateSchema,
  RoleMiddleware.isAdminRole,
  CategoriesController.deleteCategory
);

module.exports = router;
