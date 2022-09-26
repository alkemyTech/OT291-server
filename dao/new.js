const { New } = require('../models');
class NewDao {
  /**
   * Asynchronously delete a category from the database (table Category)
   * @param {number} id - To filter by attribute/s Ej: {name: 'ong'}
   */
    static async findById(id) {
        const detailNew = await New.findByPk(+id)
        if (!detailNew) {
            res.status(404).send("New was not found")
            throw new Error("New wasn't found")
        }
        return detailNew
    }
}

module.exports = NewDao;
