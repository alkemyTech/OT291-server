const { User } = require('../models');
const Token = require('../helpers/Token');
const bcrypt = require('bcrypt');
const NotifyViaEmail = require("../services/notifyViaEmail")
const AuthDao = require('../dao/authentication')

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
      NotifyViaEmail.sendEmail(response.email,"Confirmación de Registro","Bienvenido")
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
    const { email } = req;
    try {
      const dataUser = await AuthDao.findUser({ email }, [
        'firstName',
        'lastName',
        'email',
        'image'
      ]);
      res.status(200).json(dataUser)
    } catch (error) {
      res.status(404).json({ msg: 'Could not find user' })
    }
  }
}

module.exports = UserController;
