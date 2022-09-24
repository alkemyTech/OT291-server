var express = require('express');
var router = express.Router();
const userSchema = require('../schemas/user');
const ValidationErrors = require('../middlewares/validationErrors');
const UserController = require('../controllers/user-controller');
const RoleMiddleware = require('../middlewares/verify-role');

router.post(
  '/register',
  userSchema,
  ValidationErrors.validateSchema,
  UserController.post
);

router.get('/me', RoleMiddleware.isOwner, UserController.getData)

module.exports = router;
