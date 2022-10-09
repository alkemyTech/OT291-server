
const { param, query , checkSchema } = require('express-validator');

const catDeleteSchema = [
  param('id').notEmpty().withMessage('id param is required'),
];

const catPaginationSchema = [
  query('page').optional().toInt().isInt({min:1}).withMessage('Query params must be a integer and equal or greater  than 1'),
];

module.exports = {
  catDeleteSchema,
  catPaginationSchema
};
