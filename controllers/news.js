const { New } = require('../models');

class News {
  static async putNew(req, res) {
    const { id } = req.params;
    const { name, content, image, CategoryId } = req.body;

    try {
      await New.update(
        {
          name,
          image,
          content,
          CategoryId,
        },
        {
          where: {
            id,
          },
        }
      );

      const response = await New.findByPk(id);

      if (!response) {
        return res.status(404).json({ msg: 'New does not exist' });
      }

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
}

module.exports = News;