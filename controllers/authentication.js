const { User } = require('../models');

class AuthController {
  async loginUser(email, pass) {
    //Primero validamos el email
    const userInfo = await User.findAll({
      where: {
        email: email,
      },
    });
    if (!userInfo.length) {
      return { message: 'Email not found!' };
    }

    //Validamos la passwords
    if (pass != userInfo.password) {
      return { message: 'Wrong password' };
    }

    return userInfo;
  }
}

module.exports = AuthController;
