const { param, body } = require('express-validator');

const membersByIdSchema = [
  param('id').isNumeric().withMessage('id must be a number'),
];

const newMemberSchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('Name has to be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('image')
    .isURL()
    .trim()
    .withMessage('Image has to be a image URL')
    .notEmpty()
    .withMessage('Image is required'),
];

module.exports = { membersByIdSchema, newMemberSchema };
