const { Member } = require("../models");
const MemberDao = require('../dao/member');

class MemberController {
    static async deleteMember (req, res) {
       let { id } = req.params;
       let deletedMember;
        try {
            deletedMember = await MemberDao.deleteMember(id);
        } catch (error) {
          return res.status(400).json(error);
        }
        if(deletedMember) return res.status(200).json({msg:'Member deleted successfully'});
        return res.status(404).json({msg:'Could not find member'});
    }
}

module.exports = MemberController;
