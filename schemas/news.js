const { param, body } = require('express-validator');

const getByIdSchema = [
  param('id').isNumeric().withMessage('id must be a number'),
];
const newSchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('name has to be a string')
    .notEmpty()
    .withMessage('name is required'),
  body('content')
    .isString()
    .trim()
    .withMessage('content has to be a string')
    .notEmpty()
    .withMessage('content is required'),
  body('image')
    .isString()
    .trim()
    .withMessage('image has to be a string')
    .notEmpty()
    .withMessage('image is required'),
];
module.exports = { getByIdSchema, newSchema };
