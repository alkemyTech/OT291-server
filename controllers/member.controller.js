const { Member } = require("../models");
const MemberDao = require('../dao/member');

class MemberController {
    /**
    * Asynchronously delete a category from the database (table Category)
    * @param {Object} where - To filter by attribute/s Ej: {name: 'ong'}
    * @returns {boolean}
    */
    static async deleteMember (req, res) {
       let { id } = req.params;
       let deletedMember;
       const where = { id };
        try {
            deletedMember = await MemberDao.deleteMember(where);
        } catch (error) {
          return res.status(400).json(error);
        }
        if(deletedMember) return res.status(200).json({msg:'Member deleted successfully'});
        return res.status(404).json({msg:'Could not find member'});
    }
}

module.exports = MemberController;
