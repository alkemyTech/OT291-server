const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const AuthController = require('../controllers/authentication.js');

// const authController = new AuthController();

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 4 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const email = req.body.email;
      const pass = req.body.password;
      const response = await AuthController.loginUser(email, pass);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
