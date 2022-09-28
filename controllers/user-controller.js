const { User } = require('../models');
const Token = require('../helpers/Token');
const bcrypt = require('bcrypt');
const NotifyViaEmail = require('../services/notifyViaEmail');
const UserDao = require('../dao/user');

class UserController {
  static async post(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const token = await Token.generateJWT(email);
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
      NotifyViaEmail.sendEmail(
        response.email,
        'Confirmación de Registro',
        'Bienvenido'
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: 'Could not create user' });
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
      res.status(500).json({ msg: 'Something went wrong' });
    }
  }

  static async getData(req, res, next) {
    const decryptToken = Token.decryptJWT(req, res);

    if (!decryptToken || !decryptToken.email) {
      return res.status(401).json('jwt must be provided or invalid');
    }
    const { email } = decryptToken;
    try {
      const user = await User.findOne({
        where: { email },
        attributes: ['firstName', 'lastName', 'email', 'image'],
      });
      console.log(user);
      if (!user) {
        return res.status(404).json({ msg: 'Could not find user' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getUsersList(req, res) {
    try {
      const allUsers = await UserDao.getAllUsers([
        'id',
        'firstName',
        'lastName',
        'email',
      ]);
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = UserController;
