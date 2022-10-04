const TestimonialDao = require('../dao/testimonials');
const { Testimonial } = require('../models');
class TestimonialController {
  static async updateTestimonials(req, res) {
    const { id } = req.params;
    const { name, image, content } = req.body;
    let testimonial;
    const where = { id };
    const updates = { name, image, content };

    try {
      testimonial = await TestimonialDao.updateTestimonial(where, updates);
    } catch (error) {
      res.status(400).json(error);
    }

    if (!testimonial) {
      res.status(404).json({ msg: 'could not find Testimonial' });
    }

    try {
      testimonial = await TestimonialDao.findTestimonial({ where });
    } catch (error) {
      res.status(400).json(error);
    }

    if (testimonial) {
      res.status(200).json(testimonial);
    }
  }
  static async postTestimonial(req, res) {
    try {
      const { name, image, content } = req.body;
      await TestimonialDao.postTestimonial({
        name,
        image,
        content,
      });
      res.status(200).json('Testimonial created successfully.');
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async getTestimonials(req, res) {
    try {
      const testimonials = await Testimonial.findAll({
        attributes: ['name', 'image', 'content'],
      });

      if (!testimonials) {
        return res.status(404).json({
          msg: 'There is no testimonials',
        });
      }

      return res.status(200).json({
        testimonials,
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'error while searching in db',
      });
    }
  }
  static async deleteTestimonial(req, res) {}
}

module.exports = TestimonialController;
