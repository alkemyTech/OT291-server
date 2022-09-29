const SlidesDao = require('../dao/slide');
const { Slide } = require('../models');
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
  static async postSlide(req, res) {
    const { imageUrl, text } = req.body;
    let { order } = req.body;

    let allSlides;
    let slidesOrder;

    try {
      allSlides = await Slide.findAll();
      slidesOrder = allSlides
        .map(e => e.toJSON())
        .map(o => o.order)
    } catch(error) {
      res.status(400).json({ msg: 'Could not find slides' })
    }

    try {
    if (!order) order = slidesOrder.length + 1
    const newSlide = await SlidesDao.createSlide({
      imageUrl,
      text,
      order,
    }, { fields: ['imageUrl', 'text', 'order'] })
      res.status(200).json(newSlide)
    } catch (error) {
      res.status(400).json({ msg: 'Could not create a Slide' })
    }
  }
}

module.exports = SlidersController;
