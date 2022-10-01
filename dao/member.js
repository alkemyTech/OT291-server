const {Member} = require('../models');

class MemberDao {
Create_migration_comments_model   
  /**
  * Asynchronously delete a member from the database (table Members)
  * @param   {Object} where - To filter by attribute/s Ej: {id: '1'}
  * @returns {boolean}
  */
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