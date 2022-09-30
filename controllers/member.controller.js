const { Member } = require("../models")
conts = require('../dao/member');

class MemberController {
    static async deleteMember (req, res) {
        let { id } = req.params;
        let deletedMember;
        try {
            deletedMember = await Member.deleteMember(id);
            console.log(deleteMember)
        } catch (error) {
           return res.status(400).json(error);
        }
        if(deletedMember) return res.status(200).json({msg:'Member deleted successfully'});
        return res.status(404).json({msg:'Could not find member'});
    }
}

module.exports = MemberController;
