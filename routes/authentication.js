var express = require('express');
var router = express.Router();
const userSchema = require('../schemas/user');
const { loginValidation } = require('../schemas/login');
const ValidationErrors = require('../middlewares/validationErrors');
const UserController = require('../controllers/user-controller');
const AuthController = require('../controllers/authentication.js');

router.post('/login', loginValidation, AuthController.loginUser);

router.post(
  '/register',
  userSchema,
  ValidationErrors.validateSchema,
  UserController.post
);

module.exports = router;
