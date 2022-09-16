const { User } = require('../models');
const bcrypt = require('bcryptjs');

class AuthController {
  static async loginUser(email, pass) {
    try {
      const userInfo = await User.findAll({
        where: {
          email: email,
        },
        attributes: ['email', 'password'],
      });

      if (!userInfo[0]) {
        return { ok: false };
      }

      const passDataBase = bcrypt.compareSync(pass, userInfo[0].password);
      if (!passDataBase) {
        return { ok: false };
      }

      return userInfo;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AuthController;
