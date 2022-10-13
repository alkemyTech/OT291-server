const { param } = require('express-validator');

const commentsByIdSchema = [
    param('id').isNumeric().withMessage('id must be a number'),
  ];

module.exports = { commentsByIdSchema };