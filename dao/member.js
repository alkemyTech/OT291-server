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
  static async updateMember(where, data) {
    try {
      const memberUpdated = await Member.update(data, {
        where: where,
      });
      return memberUpdated[0] === 0
        ? 'Member not found.'
        : 'Member updated successfully';
    } catch (error) {
      throw new Error('Error. Member not updated.');
    }
  }

  static async getMembersById(id, attributes) {
    try {
      const member = await Member.findAll({
        where: {
          id,
        },
        attributes,
      });

      return member;
    } catch (error) {
      throw new Error('Error. Member not found');
    }
  }
}

module.exports = MemberDao;
