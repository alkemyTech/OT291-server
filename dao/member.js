const {Member} = require('../models');

class MemberDao {
  static async deleteMember(id) { 
     let deletedMember;
     try {
        deletedMember = await Member.destroy({
            where: { id },
        });
        return deletedMember;
     } catch (error) {
        throw error;
     }
  }
}
module.exports = MemberDao;