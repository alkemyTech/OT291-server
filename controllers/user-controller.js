<<<<<<< HEAD
const { createUser } = require('../services/user');

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
=======
const { User } = require('../models');

class UserController {
  static async deleteUser(req, res, next) {
    const { id } = req.params;
    try {
      const userDeleted = await User.destroy({
        where: { id },
      });
      userDeleted
        ? res.status(200).json({ msg: 'User deleted successfully' })
        : res.status(404).json({ msg: 'Could not find user' });
>>>>>>> ba12dbc9bcbe7c0c68d377a0b8e87d996ec59cbc
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
