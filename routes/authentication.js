const express = require('express');
const router = express.Router();
const { loginValidation } = require('../validators/authValidation');

const AuthController = require('../controllers/authentication.js');

const authController = new AuthController();

router.post('/login', loginValidation, async (req, res, next) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    const response = await authController.loginUser(email, pass);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
