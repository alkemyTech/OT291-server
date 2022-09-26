var express = require('express');
var router = express.Router();
const categorySchema = require('../schemas/category');
const ValidationErrors = require('../middlewares/validationErrors');
const CategoriesController = require('../controllers/categories');
const RoleMiddleware = require('../middlewares/verify-role');
const deleteSchema = require('../schemas/categories');

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
 
router.get(
  '/:id',
  RoleMiddleware.isAdminRole, 
  CategoriesController.getOneCategory);

module.exports = router;
