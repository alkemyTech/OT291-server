const { param } = require('express-validator');

const slideIdSchema = [
  param('id').notEmpty().isInt().withMessage('id must be a number'),
];

module.exports = slideIdSchema;
