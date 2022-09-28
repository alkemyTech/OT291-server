const { Slide } = require('../models');

class SlidesDao {
  static async getSlides(attributes) {
    try {
      const slidesList = await Slide.findAll({
        attributes,
      });

      return slidesList;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = SlidesDao;
