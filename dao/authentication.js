const db = require('../models');
const { User } = db;

class AuthDao {
  static async _findUser(email) {
    try {
      const userData = await User.findOne({
        where: {
          email: email,
        },
        attributes: ['email', 'password'],
      });

      return userData;
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = AuthDao;
