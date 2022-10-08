
const { param, query } = require('express-validator');

const catDeleteSchema = [
  param('id').notEmpty().withMessage('id param is required'),
];

const catPaginationSchema = [
  query('page').notEmpty().toInt().isInt().withMessage('Query params must be a integer'),
];

module.exports = {
  catDeleteSchema,
  catPaginationSchema
};
