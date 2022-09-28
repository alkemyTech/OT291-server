const NewDao = require('../dao/new');
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
}

module.exports = News;
