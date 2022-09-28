var express = require('express');
var router = express.Router();
const categorySchema = require('../schemas/category');
const ValidationErrors = require('../middlewares/validationErrors');
const CategoriesController = require('../controllers/categories');
const RoleMiddleware = require('../middlewares/verify-role');
const deleteSchema = require('../schemas/categories');

router.get('/', RoleMiddleware.isAdminRole ,CategoriesController.getAll);
router.post(
  '/',
  categorySchema,
  ValidationErrors.validateSchema,
  CategoriesController.post
);

router.delete(
  '/:id',
  deleteSchema,
  ValidationErrors.validateSchema,
  RoleMiddleware.isAdminRole,
  CategoriesController.deleteCategory
);

router.put(
  '/:id',
  categorySchema,
  ValidationErrors.validateSchema,
  RoleMiddleware.isAdminRole,
  CategoriesController.updateCategory
);

module.exports = router;
