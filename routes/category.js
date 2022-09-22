const express = require('express');
const router = express.Router();

const CategoriesController = require('../controllers/categories');
const RoleMiddleware = require('../middlewares/verify-role');

router.delete(
  '/:id',
  RoleMiddleware.isAdminRole,
  CategoriesController.deleteCategory
);

module.exports = router;
