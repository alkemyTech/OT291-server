const { param, body } = require('express-validator');

const putNewsSchema = [
  param('id').notEmpty().withMessage('id param is required'),
  body('name').isString().trim().withMessage('Name has to be a string'),
  body('content').isString().trim().withMessage('Content has to be a string'),
  body('image').isURL().trim().withMessage('Image has to be a image URL'),
  body('CategoryId').isInt().withMessage('CategoryId has to be a integer'),
];

module.exports = putNewsSchema;
