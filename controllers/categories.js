const CategoryDao = require('../dao/categorie');

class CategoriesController {
  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const where = { id };
      const categoryDeleted = await CategoryDao.deleteCategory(where);

      if (categoryDeleted) {
        res.status(200).json({ msg: 'Category deleted successfully' });
      } else {
        res.status(404).json({ msg: 'Could not find category' });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async getAll(req,res){
    try {
        const categories=await Category.findAll({attributes: ['name']})
        return  res.status(200).json(categories)   
    } catch (error) {
        return res.send(500).send(error)
    }
}
}

module.exports = CategoriesController;
