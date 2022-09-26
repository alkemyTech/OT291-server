const { New } = require('../models');

class NewDao {
    
    static async findNewById(pk) {
        try {
            const newData = await New.findByPk(pk)
            return newData;
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = NewDao;
