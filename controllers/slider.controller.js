const SlidesDao = require('../dao/slide');
const SlideHelper = require('../helpers/Slide');

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

  static async getLastSlide(order) {}

  static async postSlide(req, res) {
    const { imageUrl, text, order } = req.body;
    const getOrder = await SlideHelper.orderSlides(order);
    const decodedImage = await SlideHelper.decodeImage(imageUrl);

    try {
    const newSlide = await SlidesDao.createSlide({
        imageUrl: decodedImage,
        order: getOrder,
        text,
    }, { fields: ['imageUrl', 'text', 'order'] })
      res.status(200).json(newSlide)
    } catch (error) {
      res.status(400).json({ msg: 'Could not create a Slide' })
    }
  }
}

module.exports = SlidersController;
