const db = require('../models');
const { User } = db;
class AuthDao {
  /**
   * Asynchronously return a user from the database (table Users)
   * @param {Object} objKeyValues - To filter by attribute/s Ej: {email: 'user@mail'}
   * @param {string[]} arrayAttributes - Attributes we need Ej: ['username', 'age']
   */
  static async _findUser(objKeyValues, arrayAttributes) {
    try {
      const userData = await User.findOne({
        where: objKeyValues,
        attributes: arrayAttributes,
      });

      return userData;
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = AuthDao;
