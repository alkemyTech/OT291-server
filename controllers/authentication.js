const db = require('../models');
const bcrypt = require('bcryptjs');
const AuthDao = require('../dao/authentication');

class AuthController {
  static async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const objKeyValues = { email: email };
      const arrayAttributes = ['email', 'password'];

      const userData = await AuthDao._findUser(objKeyValues, arrayAttributes);

      if (!userData || !bcrypt.compareSync(password, userData.password)) {
        throw { ok: false };
      }

      res.status(200).json(userData);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = AuthController;
