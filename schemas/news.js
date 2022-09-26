const { param, body } = require('express-validator');

const putNewsSchema = [
  body('name')
    .notEmpty()
    .isString()
    .trim()
    .withMessage('Name has to be a string'),
];

module.exports = putNewsSchema;
