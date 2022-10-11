const { param } = require('express-validator');
const { body } = require('express-validator');

const commentsByIdSchema = [
  param('id').isNumeric().withMessage('id must be a number'),
];

const createCommentSchema = [
  body('post_id').notEmpty().withMessage('news_id is required'),
  body('user_id').notEmpty().withMessage('user_id is required'),
  body('body').notEmpty().withMessage('body is required'),
];

module.exports = { createCommentSchema, commentsByIdSchema };
