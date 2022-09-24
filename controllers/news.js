const { New } = require('../models');

class News {
  static async putNew(req, res) {
    const { id } = req.params;
    const { name, content, image, CategoryId } = req.body;

    try {
      const newDB = await New.findByPk(id);

      if (!newDB) {
        return res.status(404).json({ msg: 'New does not exist' });
      }

      const response = await newDB.update({
        name,
        image,
        content,
        CategoryId,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({
        msg: 'Error in db',
      });
    }
  }
}

module.exports = News;
