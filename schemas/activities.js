const { body } = require('express-validator');

const activitiesSchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('Name has to be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('content')
    .isString()
    .trim()
    .withMessage('Content has to be a image URL')
    .notEmpty()
    .withMessage('Content is required'),
  body('image')
    .isURL()
    .trim()
    .withMessage('Image has to be a image URL')
    .notEmpty()
    .withMessage('Image is required'),
];

module.exports = activitiesSchema
