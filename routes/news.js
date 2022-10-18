const express = require('express');
const router = express.Router();
const News = require('../controllers/news');
const ValidationErrors = require('../middlewares/validationErrors');
const RoleMiddleware = require('../middlewares/verify-role');
const { getByIdSchema, newSchema, putNewsSchema } = require('../schemas/news');

router.delete('/:id', RoleMiddleware.isAdminRole, News.deleteNew);
router.get(
  '/:id',
  RoleMiddleware.isAdminRole,
  getByIdSchema,
  ValidationErrors.validateSchema,
  News.DetailNew
);

router.post(
  '/',
  RoleMiddleware.isAdminRole,
  newSchema,
  ValidationErrors.validateSchema,
  News.postNew
);

router.put(
  '/:id',
  RoleMiddleware.isAdminRole,
  putNewsSchema,
  ValidationErrors.validateSchema,
  News.putNew
);

router.get('/', News.findAllNews);

module.exports = router;
