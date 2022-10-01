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

  static async getLastSlide(order) {
    if (order) return order;
    try {
      const lastSlide =
        (await SlidesDao.sortSlides('order', 'DESC')).map((o) => o.order)[0];
      return lastSlide + 1;
    } catch (error) {
      return error
    }
  }

  static async postSlide(req, res) {
    const { imageUrl, text } = req.body;
    let { order } = req.body;

    order = await SlidersController.getLastSlide(order);

    try {
    const newSlide = await SlidesDao.createSlide({
        imageUrl,
        order,
        text,
    }, { fields: ['imageUrl', 'text', 'order'] })
      res.status(200).json(newSlide)
    } catch (error) {
      res.status(400).json({ msg: 'Could not create a Slide' })
    }
  }
}

module.exports = SlidersController;
