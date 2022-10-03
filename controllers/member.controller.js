const { Member } = require("../models");
const MemberDao = require('../dao/member');

class MemberController {
    static async deleteMember (req, res) {
        const where = { id: req.params.id };
        let deletedMember;
        try {
              deletedMember = await MemberDao.deleteMember(where);
            } catch (error) {
            return res.status(400).json(error);
        }
        deletedMember ? 
        res.status(200).json({msg:'Member deleted successfully'})
        :
        res.status(404).json({msg:'Could not find member'});
    }
}

module.exports = MemberController;
