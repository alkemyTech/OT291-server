const { response, request } = require('express');
const { Testimonial } = require('../models');

class TestimonialController {
  static async getTestimonials(req = request, res = response) {
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
}

module.exports = TestimonialController;
