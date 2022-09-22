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
      const response = {
        name: category.name,
        description: category.description,
        image: category.image,
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoriesController;
