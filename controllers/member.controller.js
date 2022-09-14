const { Members: Member } = require("../models").sequelize.models

class MemberController {
/*    async createMember(data) {
        try {
            return await Member.create({...data})
        } catch (error) {
            throw new Error(error)
        }
    }

    async findMemberByPk(id) {
        try {
            const user = await Member.findByPk(id)
            if (!user) {
                throw new Error("Member can't be found")
            }
            return user
        } catch (error) {
            throw new Error(error)

        }
    }
    async deleteMember(id) {
        try {
            await this.findMemberByPk(id)
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteMember(id) {
        try {
            const user=await this.findMemberByPk(id)
            return user.destroy()
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateMemberById(data){
        try {
            await this.findMemberByPk(id)
        } catch (error) {
            throw new Error(error)
        }
    }
*/
}

module.exports = new MemberController