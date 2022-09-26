const { body } = require('express-validator');

const organizationSchema = [
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
  body('phone')
    .isInt()
    .trim()
    .withMessage('Phone has to be a number')
    .notEmpty()
    .withMessage('Number is required'),
  body('address')
    .isString()
    .trim()
    .withMessage('Address has to be a string')
    .notEmpty()
    .withMessage('Address is required'),
  body('email').isEmail().trim().withMessage('enter a valid email'),
  body('welcomeText')
    .isString()
    .trim()
    .withMessage('welcomeText has to be a string')
    .notEmpty()
    .withMessage('welcomeText is required'),
  body('aboutUsText')
    .isString()
    .trim()
    .withMessage('aboutUsText has to be a string')
    .notEmpty()
    .withMessage('aboutUsText is required'),
];

module.exports = organizationSchema;
