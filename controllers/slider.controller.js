const SlidesDao = require('../dao/slides');

class SlidersController {
  static async getSlides(req, res) {
    const attributes = ['imageUrl', 'order'];

    try {
      const response = await SlidesDao.getSlides(attributes);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        error,
        msg: 'error in db',
      });
    }
  }
}

module.exports = SlidersController;
