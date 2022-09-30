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
}

module.exports = MemberController;
