const { param, body } = require('express-validator');

const testimonialsSchema = [
  param('id').notEmpty().withMessage('id must be a number'),
];

const newTestimonialSchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('Name has to be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('content')
    .isString()
    .trim()
    .withMessage('Content has to be a string')
    .notEmpty()
    .withMessage('Content is required'),
];

module.exports = { testimonialsSchema, newTestimonialSchema };
