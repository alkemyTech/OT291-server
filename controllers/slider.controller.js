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

  static async deleteSlide(req, res) {
    const { id } = req.params;
    const where = { id } ;
    
    try {
      const response = await SlidesDao.deleteSlides(where);
      
      response ? res.status(200).json({ msg: 'Slide deleted successfully' })
      : res.status(404).json({ msg: 'Could not find Slide' })

    } catch (error) {
      return res.status(500).json({
        error,
        msg: 'error in db',
      });
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
