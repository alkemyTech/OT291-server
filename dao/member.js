const { Member } = require('../models');

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
  static async postNewMember({
    name,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    image,
    description,
  }) {
    try {
      await Member.create({
        name,
        facebookUrl,
        instagramUrl,
        linkedinUrl,
        image,
        description,
      });
      return;
    } catch (error) {
      throw new Error('Error. Member not created.');
    }
  }
}

module.exports = MemberDao;
