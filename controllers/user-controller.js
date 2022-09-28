const { User } = require('../models');
const Token = require('../helpers/Token');
const bcrypt = require('bcrypt');
const NotifyViaEmail = require("../services/notifyViaEmail")
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
      console.log(user)
      if (!user) {
        return res.status(404).json({ msg: 'Could not find user' });
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, password, image } = req.body;
    let updateUser;
    try {
         [updateUser] = await User.update({
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
    if(updateUser) {
      return res.status(200).json({ msg: 'User update successfully'})
    }
    return res.status(404).json({ msg: 'Could not find user' });
  }  
}

module.exports = UserController;
