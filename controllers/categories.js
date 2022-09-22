const CategoryDao = require('../dao/categorie');

class CategoriesController {
  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const where = { id: id };
      const categoryDeleted = await CategoryDao.deleteCategory(where);

      categoryDeleted
        ? res.status(200).json({ msg: 'Category deleted successfully' })
        : res.status(404).json({ msg: 'Could not find category' });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = CategoriesController;
