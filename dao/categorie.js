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
      throw new Error(error);
    }
  }
  /**
   * Asynchronously delete a category from the database (table Category)
   * @param {string} fields - To filter by attribute/s Ej: {name: 'ong'}
   * @returns {Promise}
   */
  static async filteringCategoryResultsByField(...fields) {
    try {
      const categoryData = await Category.findAll({
        attributes: fields,
      });
      return categoryData;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getOneCategory(id) {    
    try {
      const getOneCategory = await Category.findByPk(id,
        {attributes: ['name','description','image']
      });
      return getOneCategory;
    } catch (error) {
     throw (error);
    }
  }    

  /**
   * Asynchronously retunr a array with 10 categories from the database (table Category)
   * @param {number} offset - to take categories since a determinate row of the table Category
   * @returns {Array}
   */
   static async paginationCategorie(offset, limit) {
    try {
      const pagination = await Category.findAndCountAll({
        attributes: ['name', 'description', 'image'],
        offset,
        limit,
      });

      return pagination;
    } catch (error) {
      throw error;
    }
  }
  
}

module.exports = CategoryDao;
