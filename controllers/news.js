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
      const newCreated = await NewDao.postNew({ name, content, image });
      newCreated
        ? res.status(200).json({ msg: 'New created successfully' })
        : res.status(404).json({ msg: 'Error. New not created.' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = News;
