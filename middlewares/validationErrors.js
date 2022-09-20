const { validationResult } = require('express-validator');
//const userSchema = require('../schemas/user');

class ValidationErrors {
  static async validateSchema(req, res, next, userSchema) {
    try {
      await Promise.all(userSchema.map((validation) => validation.run(req)));
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
