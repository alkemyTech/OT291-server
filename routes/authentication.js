var express = require('express');
var router = express.Router();
const { userSchema, loginSchema } = require('../schemas/user');
const ValidationErrors = require('../middlewares/validationErrors');
const UserController = require('../controllers/user-controller');
const AuthController = require('../controllers/authentication.js');
const ValidatejWtUser = require('../middlewares/verify-role-user');
const RoleMiddleware = require('../middlewares/verify-role.js');

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

router.get('/me', ValidatejWtUser.decryptTokenUser, UserController.getData);

module.exports = router;
