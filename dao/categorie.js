const db = require('../models');
const { Category } = db;
class CategoryDao {
  /**
   * Asynchronously delete a category from the database (table Category)
   * @param {Object} where - To filter by attribute/s Ej: {name: 'ong'}
   * @returns {boolean}
   */
  static async deleteCategory(where) {
    try {
      const categoryData = await Category.destroy({
        where: where,
      });
      return categoryData;
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = CategoryDao;