const { param, body } = require('express-validator');

const getByIdSchema = [
  param('id').isNumeric().withMessage('id must be a number'),
];

const putNewsSchema = [
  body('name')
    .notEmpty()
    .isString()
    .trim()
    .withMessage('Name has to be a string'),
];

module.exports = { getByIdSchema, putNewsSchema };
