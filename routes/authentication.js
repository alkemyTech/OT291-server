const express = require('express');
const router = express.Router();
const { loginValidation } = require('../schemas/login');

const AuthController = require('../controllers/authentication.js');

router.post('/login', loginValidation, AuthController.loginUser);

module.exports = router;
