const db = require('../models');
const { Category } = db;
class CategoryDao {
  /**
   * Asynchronously delete a category from the database (table Category)
   * @param {Object} where - To filter by attribute/s Ej: {name: 'ong'}
   */
  static async deleteCategory(where) {
    try {
      const categoryData = await Category.findOne({
        where: where,
      });

      if (categoryData) {
        await categoryData.destroy();
        return true;
      }
      return false;
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = CategoryDao;
