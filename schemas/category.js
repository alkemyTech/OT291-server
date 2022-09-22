const { body } = require('express-validator');

const categorySchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('name has to be a string')
    .notEmpty()
    .withMessage('name is required'),
];

module.exports = categorySchema;
