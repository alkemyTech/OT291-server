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
  static async getAll(req, res) {
    try {
      const categories = await CategoryDao.filteringCategoryResultsByField(
        'name'
      );
      const format = categories.map((category) => category.name);
      return res.status(200).json(format);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  static async updateCategory(req, res) {
    const { id } = req.params;
    const { name, description, image } = req.body;
    try {
      const categoryUpdated = await Category.findByPk(id);
      categoryUpdated &&
        (await categoryUpdated.update({ name, description, image }));
      categoryUpdated
        ? res.status(200).json({ msg: 'Category updated successfully' })
        : res.status(404).json({ msg: 'Could not find category' });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async getOneCategory(req, res) {
    const { id } = req.params;
    let getOneCategory;
    try {
      getOneCategory = await CategoryDao.getOneCategory(id);
    } catch (error) {
      return res.status(400).json(error);
    }
    if (getOneCategory) return res.status(200).json(getOneCategory);
    return res.status(404).json({ msg: 'Could not find category' });
  }

  static async paginationCategory(req, res) {
    const { page } = req.query;

    let offset;
    let pageInt = parseInt(page);
    let aux = pageInt * 10 - 10;
    let next = pageInt + 1;
    let previous = pageInt - 1;

    if (parseInt(page) < 1) {
      res.status(404).json({ msg: 'Page must be greater than 0' });
    }

    if (page && parseInt(page) === 1) {
      offset = 0;
      let categories;

      try {
        categories = await CategoryDao.paginationCategorie(offset);
      } catch (error) {
        return res.status(400).json(error);
      }

      categories.length > 0
        ? res.send({
            categories,
            next: `http://localhost:3000/categories?page=${next}`,
          })
        : res.status(404).json({ msg: 'Could not find categories' });
    }

    if (page && parseInt(page) > 1) {
      offset = aux;
      let finalOffset= aux + 10
      let categories;
      let finalpage;



     try {
      
     finalpage = await await CategoryDao.paginationCategorie(finalOffset);

     } catch ( error ) {
      return res.status(400).json(error);
     }

     if ( finalpage.length === 0 ) {
      
     }






      try {
        categories = await CategoryDao.paginationCategorie(offset);
      } catch (error) {
        return res.status(400).json(error);
      }

      categories.length > 0
        ? res.send({
            categories,
            previous: `http://localhost:3000/categories?page=${previous}`,
            next: `http://localhost:3000/categories?page=${next}`,
          })
        : res.status(404).json({ msg: 'Could not find categories' });
    }
  }
}

module.exports = CategoriesController;
