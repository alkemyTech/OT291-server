const { body } = require('express-validator');

const userSchema = [
  body('firstName')
    .isString()
    .trim()
    .withMessage('firstName has to be a string')
    .notEmpty()
    .withMessage('firstName is required'),
  body('lastName')
    .isString()
    .trim()
    .withMessage('lastName has to be a string')
    .notEmpty()
    .withMessage('lastName is required'),
  body('email').isEmail().trim().withMessage('enter a valid email'),
];

const loginSchema = [
  body('email').notEmpty().isString().isEmail(),
  body('password').notEmpty().isString().isLength({ min: 4 }),
];

module.exports = { userSchema, loginSchema };
