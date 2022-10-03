const { Slide } = require('../models');
class SlidesDap {
  /**
   * Asynchronously and extensible function return a Slid from the database.
   * @param {Object} where - Filter by attributes
   * @param {Object} exclude - "Optional" exclude an attribute
   *
   * EJ: `findSlide({ where: {id: 1}, exclude: ['deletedAt'] })`
   * @returns {Object}
   */
  static async findSlide({ where, exclude = [] }) {
    try {
      const SlideData = await Slide.findOne({
        where: where,
        attributes: { exclude: exclude },
      });
      return SlideData;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async findSlidebyOrganization({ where, exclude = [], order = [] }) {
    try {
      const SlideData = await Slide.findAll({
        where: where,
        attributes: { exclude: exclude },
        order: [order],
      });
      return SlideData;
    } catch (error) {
      throw new Error(error);
    }
  }
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
  static async deleteSlides(where) {
    try {
      const deleteSlide = await Slide.destroy({
        where,
      });

      return deleteSlide;
    } catch (error) {
      throw new Error(error);
    }
  } 
  /**
   * Asynchronously and extensible function return a Slide from the database.
   * @param {Object} attributes
   * @param {Object} fields -  limit what attributes can be setted by user
   *
   * @returns {Object}
   */
  static async createSlide(attributes, fields) {
    try {
      const newSlide = await Slide.create(attributes, fields);
      return newSlide;
    } catch (error) {
      return error;
    }
  }
}

module.exports = SlidesDap;
