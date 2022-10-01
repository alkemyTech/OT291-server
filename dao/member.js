const {Member} = require('../models');

class MemberDao {
Create_migration_comments_model   
  /**
  * Asynchronously delete a category from the database (table Category)
  * @param   {Object} where - To filter by attribute/s Ej: {name: 'ong'}
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