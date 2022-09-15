const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authentication.js');

const authController = new AuthController();

router.post('/login', async (req, res, next) => {
  try {
    const response = await authController.loginUser();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
