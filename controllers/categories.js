const { Category } = require('../models');

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
}

module.exports = CategoriesController;
