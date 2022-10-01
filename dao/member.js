const {Member} = require('../models');

class MemberDao {
   static async deleteMember(id) { 
     let deletedMember;
     try {
          deletedMember = await Member.findByPk(id);
     } catch (error) {
        throw error;
     }
     if(deletedMember) await deletedMember.destroy();
     return deletedMember;
   }
}

module.exports = MemberDao;