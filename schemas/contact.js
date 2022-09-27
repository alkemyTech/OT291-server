const { body } = require('express-validator');

const createContactSchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('name has to be a string')
    .notEmpty()
    .withMessage('name is required'),
  body('email')
    .isEmail()
    .trim()
    .withMessage('must be a email')
    .notEmpty()
    .withMessage('email is required')
];

module.exports = {createContactSchema};