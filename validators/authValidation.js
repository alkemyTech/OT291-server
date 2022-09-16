const { check, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403);
    res.send({ errors: err.array() });
  }
};

const loginValidation = [
  check('email').exists().isEmail(),
  check('password').exists().isLength({ min: 4 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { loginValidation };
