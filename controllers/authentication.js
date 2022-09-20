const db = require('../models');
const bcrypt = require('bcryptjs');
const AuthDao = require('../dao/authentication');

class AuthController {
  static async loginUser(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    try {
      const userData = await AuthDao._findUser(email);

      if (!userData || !bcrypt.compareSync(password, userData.password)) {
        throw { ok: false };
      }

      return res.status(200).json(userData);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = AuthController;
