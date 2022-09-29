const { param } = require('express-validator');

const testimonialsSchema = [
  param('id').notEmpty().withMessage('id must be a number'),
];

module.exports = testimonialsSchema;
