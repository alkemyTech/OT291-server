const {Member} = require('../models');

class MemberDao {
  static async deleteMember(where) { 
     try {
          let deletedMember = await Member.destroy({
          where: where,
        });
        return deletedMember;
     } catch (error) {
        throw error;
     }
  }
}

module.exports = MemberDao;