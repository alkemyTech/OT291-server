const { User } = require('../models');

class UserDao {
  /**
   * Asynchronously return all users from the database (table Users)
   * @param {string[]} attributes - Attributes we need Ej: ['firstName', 'lastName']
   */
  static async getAllUsers(attributes) {
    try {
      const allUsers = await User.findAll({
        attributes
      })
      return allUsers;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserDao;
