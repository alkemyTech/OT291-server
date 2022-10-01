const TestimonialDao = require('../dao/testimonials');
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
}

module.exports = TestimonialController;
