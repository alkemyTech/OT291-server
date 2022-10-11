const { New } = require('../models');
const NewDao = require('../dao/new');
const buildPaginator = require('pagination-apis');
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
    try {
      const { page, size } = req.query;

      const { limit, skip, paginate } = buildPaginator({
        page: page,
        limit: size,
        maximumLimit: 10,
        url: '/news',
      });

      const newData = await NewDao.findAllNews(limit, skip);
      const rows = newData.rows;
      const count = newData.count;

      return res.status(200).json(paginate(rows, count));
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

module.exports = News;
