const { check } = require('express-validator');
const { validateResult } = require('../validators/login');

const loginValidation = [
  check('email').exists().isEmail(),
  check('password').exists().isLength({ min: 4 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { loginValidation };
