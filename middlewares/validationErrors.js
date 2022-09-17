const { validationResult } = require('express-validator');

module.exports = {
  validateSchema: (validations) => async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors,
      });
    }
    return next();
  },
};
