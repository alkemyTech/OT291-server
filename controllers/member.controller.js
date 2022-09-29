const { Member } = require("../models")

class MemberController {
    static async deleteMember (req, res) {
        let { id } = req.params;
        let deleteMember;
        try {
            deleteMember = await Member.destroy({
                where: { id },
            });
        } catch (error) {
           return res.status(400).json(error);
        }
        if(deleteMember) return res.status(200).json({msg:'Member deleted successfully'});
        return res.status(404).json({msg:'Could not find member'});
    }
}

module.exports = MemberController;
