const { body } = require('express-validator');

const categorySchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('name has to be a string')
    .notEmpty()
    .withMessage('name is required'),
  body('description')
    .isString()
    .trim()
    .withMessage('description has to be a string')
    .notEmpty()
    .withMessage('description is required'),
  body('image')
    .isString()
    .trim()
    .withMessage('image has to be a string')
    .notEmpty()
    .withMessage('image is required'),
];

module.exports = categorySchema;
