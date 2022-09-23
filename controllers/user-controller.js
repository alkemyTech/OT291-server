const { User } = require('../models');
const { Token } = require('../helpers/Token');
const bcrypt = require('bcrypt');

class UserController {
  static async post(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const token = Token.generateJWT(email);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(
          password,
          Number.parseInt(process.env.AUTH_ROUNDS)
        ),
      });
      const response = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token,
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
