const SlidesDao = require('../dao/slide');
class SlidersController {
  static async getDetails(req, res) {
    const { id } = req.params;
    try {
      const where = { id: id };

      const slideData = await SlidesDao.findSlide({
        where: where,
      });

      if (!slideData) {
        res.status(404).json({ message: 'Could not find the slide' });
      } else {
        res.status(200).json(slideData);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
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
