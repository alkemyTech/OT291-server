const { param } = require('express-validator');

const catDeleteSchema = [
  param('id').notEmpty().withMessage('id param is required'),
];

module.exports = catDeleteSchema;
