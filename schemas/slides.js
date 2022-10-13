const { param } = require('express-validator');

const slideIdSchema = [
  param('id').notEmpty().isNumeric().isInt().withMessage('id must be a number'),
];

module.exports = slideIdSchema;
