const express = require('express');
const router = express.Router();
const { loginValidation } = require('../validators/authValidation');

const AuthController = require('../controllers/authentication.js');

router.post('/login', loginValidation, async (req, res, next) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    const response = await AuthController.loginUser(email, pass);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
