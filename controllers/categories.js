const { Category } = require('../models');
const CategoryDao = require('../dao/categorie');

class CategoriesController {
  static async post(req, res, next) {
    try {
      const { name, description, image } = req.body;
      const category = await Category.create({
        name,
        description,
        image,
      });
      category
        ? res.status(200).json({ msg: 'Category created successfully' })
        : res.status(404).json({ msg: 'Error. Category not created.' });
    } catch (error) {
      next(error);
    }
  }
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
  static async getOneCategory(req, res){
    const {id} = req.params
    try {
        const getOneCategory = await Category.findByPk(id,{
          attributes: ['name','description','image']
        });
        if(getOneCategory) return res.status(200).json(getOneCategory);
        return res.status(404).json({ msg: 'Could not find category'});
    } catch (error) {
      res.status(400).json(error);
    }            
}  
}

module.exports = CategoriesController;
