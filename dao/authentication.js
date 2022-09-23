const db = require('../models');
const { User } = db;
class AuthDao {
  /**
   * Asynchronously return a user from the database (table Users)
   * @param {Object} where - To filter by attribute/s Ej: {email: 'user@mail'}
   * @param {string[]} attributes - Attributes we need Ej: ['username', 'age']
   * @returns {boolean}
   */
  static async findUser(where, attributes) {
    try {
      const userData = await User.findOne({
        where: where,
        attributes: attributes,
      });

      return userData;
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = AuthDao;
