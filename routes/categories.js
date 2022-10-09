var express = require('express');
var router = express.Router();
const categorySchema = require('../schemas/category');
const ValidationErrors = require('../middlewares/validationErrors');
const CategoriesController = require('../controllers/categories');
const RoleMiddleware = require('../middlewares/verify-role');
const {catDeleteSchema , catPaginationSchema} = require('../schemas/categories');
const ValidatejWtUser = require('../middlewares/verify-role-user');

router.get('/', catPaginationSchema, ValidationErrors.validateSchema , RoleMiddleware.isAdminRole, CategoriesController.getAll);
router.post(
  '/',
  categorySchema,
  ValidationErrors.validateSchema,
  CategoriesController.post
);

router.delete(
  '/:id',
  catDeleteSchema,
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

router.get(
  '/:id', RoleMiddleware.isAdminRole,
  CategoriesController.getOneCategory
);
 

// router.get('/', catPaginationSchema, ValidationErrors.validateSchema, CategoriesController.paginationCategory)

module.exports = router;
