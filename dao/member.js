const { Member } = require('../models');

class MemberDao {
  static async getMembers(attributes) {
    try {
      const members = await Member.findAll({
        attributes,
      });

      return members;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = MemberDao;
