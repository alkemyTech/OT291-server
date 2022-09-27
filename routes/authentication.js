var express = require('express');
var router = express.Router();
const { userSchema, loginSchema } = require('../schemas/user');
const ValidationErrors = require('../middlewares/validationErrors');
const UserController = require('../controllers/user-controller');
const AuthController = require('../controllers/authentication.js');
const ValidatejWtUser = require('../middlewares/verify-role-user');

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

router.get('/me', UserController.getData)

module.exports = router;
