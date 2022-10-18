const { body } = require('express-validator');

const orderSchema = [
  body('amount')
    .notEmpty()
    .withMessage('amount is required')
    .isNumeric()
    .withMessage('amount must be a number'),
  body('category')
    .notEmpty()
    .withMessage('category is required')
    .isString()
    .trim()
    .withMessage('category has to be a string')
    .isIn(['singleDonation', 'recurrentDonation'])
    .withMessage("category must be 'singleDonation' or 'recurrentDonation'"),
  body('userEmail')
    .notEmpty()
    .withMessage('userEmail is required')
    .isEmail()
    .trim()
    .withMessage('userEmail must be a email'),
];

module.exports = { orderSchema };
