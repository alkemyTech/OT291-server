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
  static async postNew(req, res, next) {
    try {
      const { name, content, image } = req.body;
      await NewDao.postNew({ name, content, image });
      return res.status(200).json({ msg: 'New created successfully' });
    } catch (error) {
      return res.status(500).json({ msg: 'Error. New not created.' });
    }
  }
}

module.exports = News;
