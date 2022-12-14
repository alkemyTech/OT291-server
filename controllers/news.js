const { New } = require('../models');
const NewDao = require('../dao/new');
const Pagination = require('../helpers/pagination');
class News {
  static async DetailNew(req, res) {
    try {
      const { id } = req.params;
      const newData = await NewDao.findNewById(+id);
      if (!newData) return res.status(404).send("New wasn't found");
      return res.status(200).json(newData);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  static async postNew(req, res, next) {
    try {
      const { name, content, image } = req.body;
      await NewDao.postNew({ name, content, image });
      return res.status(200).json({ msg: 'New created successfully' });
    } catch (error) {
      return res.status(500).json({ msg: 'Error. New not created.' });
    }
  }

  static async putNew(req, res) {
    const { id } = req.params;
    const { name, content, image, CategoryId } = req.body;

    try {
      await NewDao.updateNew(name, image, content, CategoryId, id);

      const response = await NewDao.findNewById(id);

      if (!response) return res.status(404).json({ msg: 'New does not exist' });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteNew(req, res) {
    const { id } = req.params;

    try {
      const newToDelete = await New.findByPk(id, {
        attributes: ['id'],
      });

      if (!newToDelete) {
        return res.json({
          msg: 'new not found',
        });
      }

      await newToDelete.destroy();

      return res.json({
        msg: `New with ${newToDelete.id} has been deleted succesfully`,
      });
    } catch (error) {
      return res.status(500).json({
        error,
        msg: 'error in db',
      });
    }
  }

  static async findAllNews(req, res) {
    if (!req.query.page) {
      try {
        const allNews = await NewDao.findAll();
        return res.status(200).json(allNews);
      } catch (error) {
        return res.status(500).json({
          msg: 'Error while searching news in db',
        });
      }
    } else {
      try {
        const pagination = new Pagination(req, res);
        const { page, size } = pagination.getPaginationParams(req, res);

        const allNewsPage = await NewDao.findAllNewsPages(size, page);

        let totalPages = pagination.getNumberOfTotalPages(
          allNewsPage.count,
          size
        );

        const { nextPage, previousPage } = pagination.getNextAndPreviousPage(
          page,
          size,
          totalPages
        );

        if (allNewsPage.count < 1) {
          return res.status(404).json({
            msg: 'There is no news',
          });
        }

        return res.status(200).json({
          content: allNewsPage.rows,
          totalPages,
          nextPage,
          previousPage,
        });
      } catch (error) {
        return res.status(500).json({
          msg: 'Error while searching news in db',
        });
      }
    }
  }
}

module.exports = News;
