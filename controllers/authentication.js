const { User } = require('../models');

class AuthController {
  async loginUser() {
    const findAuth = await User.findOne();
    return findAuth;
  }
}

module.exports = AuthController;
