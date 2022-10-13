const { Category } = require('../models');
const CategoryDao = require('../dao/categorie');
const Pagination = require('../helpers/pagination');


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
    if (!req.query.page) {
      let categories;

      try {
        categories = await CategoryDao.filteringCategoryResultsByField('name');
      } catch (error) {
        return res.status(500).send(error);
      }

      const format = categories.map((category) => category.name);

      if (!categories)
        return res.status(404).json({ msg: 'Could not find categories' });

      return res.status(200).json(format);
    }

    if (req.query.page) {
      const pagination = new Pagination(req, res); 
      const { page, size } = pagination.getPaginationParams(req, res);
      const offset = page * size;


      let paginationCategory;

      try {
        paginationCategory = await CategoryDao.paginationCategorie(
          offset,
          size
        );

        
      } catch (error) {
        return res.status(500).json({
          msg: 'error while searching in db',
          msg: 'Error while searching categories in db',
        });
      }
      
     
     
      if (paginationCategory) {
         let totalPages = pagination.getNumberOfTotalPages(
          paginationCategory.count,
          size
          );
        }
          
         

        if (paginationCategory.count < 1) {
          return res.status(404).json({
            msg: 'There is not categories',
          });
        }

        

        const { nextPage, previousPage } = pagination.getNextAndPreviousPage(
          page,
          size,
          totalPages
        );

        console.log(nextPage)


        return res.status(200).json({
          paginationCategory,
          content: paginationCategory.rows,
          totalPages,
          nextPage,
          previousPage,
        });
      
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
}

module.exports = CategoriesController;
