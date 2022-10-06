const { User } = require('../models');
const Token = require('../helpers/Token');
const bcrypt = require('bcrypt');
const NotifyViaEmail = require("../services/notifyViaEmail")
const AuthDao = require('../dao/authentication')
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

    const { email } = Token.decryptJWT(req, res);
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

  static async updateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, password, image } = req.body;
    let updatedUser;
    try {
         [updatedUser] = await User.update({
           firstName,
           lastName,
           email,
           password : bcrypt.hashSync(password,Number.parseInt(process.env.AUTH_ROUNDS)),
           image,
          },
          {
            where:{ id }
          })
    } catch (error) {
      return res.status(400).json(error);
    }
    if(updatedUser) {
      return res.status(200).json({ msg: 'User update successfully'})
    }
    return res.status(404).json({ msg: 'Could not find user' });
  }  
}

module.exports = UserController;
