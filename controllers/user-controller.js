const { createUser } = require('../services/user');

class UserController {
  async post(req, res, next) {
    try {
      const user = await createUser(req.body);
      const response = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
