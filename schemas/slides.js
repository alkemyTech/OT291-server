const { param,body } = require('express-validator');

const slideIdSchema = [
  param('id').notEmpty().isNumeric().withMessage('id must be a number'),
];


module.exports = {slideIdSchema};
