const { validationResult } = require('express-validator');

class ValidationErrors {
  static async validateSchema(validations, req, res, next) {
    console.log(validations);
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors,
        });
      }
      return next();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ValidationErrors;
