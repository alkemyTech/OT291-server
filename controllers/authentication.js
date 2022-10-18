const db = require('../models');
const bcrypt = require('bcrypt');
const AuthDao = require('../dao/authentication');
const Token = require('../helpers/Token');

class AuthController {
  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const where = { email: email };
      const attributes = ['email', 'password'];

      const userData = await AuthDao.findUser(where, attributes);

      if (!userData || !bcrypt.compareSync(password, userData.password)) {
        throw { ok: false };
      }

      const token = await Token.generateJWT(email);

      const dataUser = {
        user: email,
        token: token,
      };

      res.status(200).json(dataUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = AuthController;
