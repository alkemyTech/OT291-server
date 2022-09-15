const { User } = require('../models');
const bcrypt = require('bcryptjs');

class AuthController {
  async loginUser(email, pass) {
    //Primero validamos el email
    const userInfo = await User.findAll({
      where: {
        email: email,
      },
    });
    if (!userInfo[0]) {
      return { ok: false };
    }

    //Validamos la passwords del body con la password hash de la DB
    const passDataBase = bcrypt.compareSync(pass, userInfo[0].password);
    if (!passDataBase) {
      return { ok: false };
    }

    return userInfo;
  }
}

module.exports = AuthController;
