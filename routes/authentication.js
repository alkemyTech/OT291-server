var express = require('express');
var router = express.Router();
const { userSchema, loginSchema } = require('../schemas/user');
const ValidationErrors = require('../middlewares/validationErrors');
const UserController = require('../controllers/user-controller');
const RoleMiddleware = require('../middlewares/verify-role');
const AuthController = require('../controllers/authentication.js');

router.post(
  '/login',
  loginSchema,
  ValidationErrors.validateSchema,
  AuthController.loginUser
);

router.post(
  '/register',
  userSchema,
  ValidationErrors.validateSchema,
  UserController.post
);

router.get('/me', RoleMiddleware.isOwner, UserController.getData)

module.exports = router;
