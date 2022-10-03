const { Testimonial } = require('../models');

class TestimonialDao {
  /**
   * Asynchronously and extensible function return a Testimonial from the database.
   * @param {Object} where - Filter by attributes
   * @param {Object} exclude - "Optional" exclude an attribute
   *
   * EJ: `findTestimonial({ where: {id: 1}, exclude: ['deletedAt'] })`
   * @returns {Object}
   */
  static async findTestimonial({ where, exclude = [] }) {
    try {
      const TestimonialData = await Testimonial.findOne({
        where: where,
        attributes: { exclude: exclude },
      });
      return TestimonialData;
    } catch (error) {
      throw new Error(error);
    }
  }
  /**
   * Asynchronously update a Testimonials from the database.
   * @param {Object} where - Filter by attributes EJ: {id: 1}
   * @param {Object} updates - Updates attribute EJ: {name, email, age}
   * @returns {Object}
   */
  static async updateTestimonial(where, updates) {
    try {
      const testimonialData = await Testimonial.update(updates, {
        where: where,
      });
      return testimonialData;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async postTestimonial({ name, image, content }) {
    try {
      await Testimonial.create({
        name,
        image,
        content,
      });
      return;
    } catch (error) {
      throw new Error('Error. Testimonial not created.');
    }
  }
}

module.exports = TestimonialDao;
