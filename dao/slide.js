const { Slide } = require('../models');
class SlidesDap {
  /**
   * Asynchronously and extensible function return a slide data from the database (table Slide)
   * @param {Object} where - To filter by attributes EJ: where: {id: 1}
   * @param {Object} options - "Optional" To search attributs, models, etc EJ: options: {atributtes: ['id']}
   * @returns {Object}
   */
  static async findSlide(where) {
    try {
      const SlideData = await Slide.findOne({
        where: where,
      });
      return SlideData;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = SlidesDap;
