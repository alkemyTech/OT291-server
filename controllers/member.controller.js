const { Member } = require('../models');
const MemberDao = require('../dao/member');

class MemberController {
  static async deleteMember(req, res) {
    const where = { id: req.params.id };
    let deletedMember;
    try {
      deletedMember = await MemberDao.deleteMember(where);
    } catch (error) {
      return res.status(400).json(error);
    }
    deletedMember
      ? res.status(200).json({ msg: 'Member deleted successfully' })
      : res.status(404).json({ msg: 'Could not find member' });
  }

  static async getMembers(req, res) {
    try {
      const members = await Member.findAll({
        attributes: [
          'name',
          'facebookUrl',
          'instagramUrl',
          'linkedinUrl',
          'image',
          'description',
        ],
      });

      if (!members) {
        return res.status(404).json({
          msg: 'There is no registered members',
        });
      }
      return res.status(200).json({
        members,
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'error while searching in db',
        error,
      });
    }
  }
}

module.exports = MemberController;
