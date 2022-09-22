const { validationResult } = require('express-validator');

class ValidationErrors {
  static async validateSchema(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors,
        });
      }
      return next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ValidationErrors;
