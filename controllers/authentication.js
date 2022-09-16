const { User } = require('../models');
const bcrypt = require('bcryptjs');

class AuthController {
  async loginUser(email, pass) {
    try {
      const userInfo = await User.findAll({
        attributes: ['email', 'password'],
        where: {
          email: email,
        },
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
