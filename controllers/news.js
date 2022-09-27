const { New } = require('../models');

class News {
  static async deleteNew(req, res) {
    const { id } = req.params;
    console.log(New);

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
}

module.exports = News;
