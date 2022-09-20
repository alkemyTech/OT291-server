const { createUser } = require('../services/user');
const { User } = require('../models');

class UserController {
  static async post(req, res, next) {
    try {
      const user = await createUser(req.body); //destructurar.
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
  static async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const userDeleted = await User.destroy({
        where: { id },
      });
      userDeleted
        ? res.status(200).json({ msg: 'User deleted successfully' })
        : res.status(404).json({ msg: 'Could not find user' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
