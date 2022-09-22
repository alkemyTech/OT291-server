var express = require('express');
var router = express.Router();
const { userSchema, loginSchema } = require('../schemas/user');
const ValidationErrors = require('../middlewares/validationErrors');
const UserController = require('../controllers/user-controller');
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
  ValidationErrors.validateLogin,
  UserController.post
);

module.exports = router;
