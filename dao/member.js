const {Member} = require('../models');

class MemberDao {
  /**
  * Asynchronously delete a member from the database (table Members)
  * @param   {Object} where - To filter by attribute/s Ej: {id: '1'}
  * @returns {boolean}
  */
   static async deleteMember(where) { 
     try {
            let deletedMember = await Member.destroy({
               where,
            });
           return deletedMember;
         } catch (error) {
         throw error;
      }
   }
}

module.exports = MemberDao;