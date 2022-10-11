const { Slide } = require('../models');
const MapperResponse = require('../utils/formatResponse');
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
  static async findSlidebyPk(id) {
    try {
      const SlideData = await Slide.findByPk(+id);
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
  static async updateSLide(data, id) {
    try {
      const slide = await this.findSlidebyPk(id);
      if (!slide) {
        throw new Error("Slide wasn't found");
      }
      const formatResponse = MapperResponse.cleanDataDb(
        await slide.update(data)
      );
      return formatResponse;
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
   * @param {Array} fields -  limit what attributes can be setted by user
   *
   * @returns {Object}
   */
  static async createSlide(attributes, direction) {
    try {
      const newSlide = await Slide.create(attributes, direction);
      return newSlide;
    } catch (error) {
      throw Error(error);
    }
  }
  /**
   * Asynchronously and extensible function return Slide table sort by choosen direction.
   * @param {string} column - table to be sorted
   * @param {string} direction -  direction that column will be sort
   * EJ: `sortSlides('slides', 'ASC')`
   *
   * @returns {Array}
   */
  static async sortSlides(column, direction) {
    try {
      const allSlides = await Slide.findAll({
        order: [[column, direction]],
      });
      return allSlides;
    } catch (error) {
      return error;
    }
  }
}

module.exports = SlidesDap;
