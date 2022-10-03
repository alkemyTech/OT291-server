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
  static async postNewMember(req, res) {
    try {
      const {
        name,
        facebookUrl,
        instagramUrl,
        linkedinUrl,
        image,
        description,
      } = req.body;
      await MemberDao.postNewMember({
        name,
        facebookUrl,
        instagramUrl,
        linkedinUrl,
        image,
        description,
      });
      res.status(200).json('Member created successfully.');
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = MemberController;
