const { Member } = require('../models');
const MemberDao = require('../dao/member');

class MemberController {
  static async getMembers(req, res) {
    const attributes = ['name', 'image'];

    try {
      const response = await MemberDao.getMembers(attributes);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        error,
        msg: 'error in db',
      });
    }
  }

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
  static async updateMember(req, res) {
    try {
      const {
        name,
        facebookUrl,
        instagramUrl,
        linkedinUrl,
        image,
        description,
      } = req.body;
      const { id } = req.params;
      const resultUpdate = await MemberDao.updateMember(
        { id },
        {
          name,
          facebookUrl,
          instagramUrl,
          linkedinUrl,
          image,
          description,
        }
      );
      res.status(200).json(resultUpdate);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async getMemberById(req, res) {
    const attributes = ['name', 'image'];
    const { id } = req.params;

    let member;

    try {
      member = await MemberDao.getMembersById(id, attributes);
    } catch (error) {
      res.status(400).json(error);
    }

    member.length === 0
      ? res.status(404).json({ msg: 'Could not find member' })
      : res.status(200).json(member);
  }
}

module.exports = MemberController;
