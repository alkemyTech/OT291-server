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
      return { message: 'Email not found!' };
    }

    //Validamos la passwords del body con la password hash de la DB
    const passDataBase = bcrypt.compareSync(pass, userInfo[0].password);
    if (!passDataBase) {
      return { message: 'Incorrect password!' };
    }

    return userInfo;
  }
}

module.exports = AuthController;
