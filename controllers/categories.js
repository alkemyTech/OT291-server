const { Category } = require('../models');

class CategoriesController {
  static async post(req, res, next) {
    try {
      console.log("hola")
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
      console.log(error);
    }
  }
}

module.exports = CategoriesController;
