const TestimonialDao = require('../dao/testimonials');
const { Testimonial } = require('../models');
const Pagination = require('../helpers/pagination');
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
      res.status(400).json({
        msg: 'Error while creating testimonial',
      });
    }
  }
  static async getTestimonials(req, res) {
    if (!req.query.page) {
      try {
        const testimonials = await TestimonialDao.getTestimonials([
          'name',
          'image',
          'content',
        ]);

        if (!testimonials) {
          return res.status(404).json({
            msg: 'There is no testimonials',
          });
        }

        return res.json({
          testimonials,
        });
      } catch (error) {
        return res.status(500).json({
          msg: 'Error while searching testimonials ',
        });
      }
    }
    const pagination = new Pagination(req, res);
    const { page, size } = pagination.getPaginationParams(req, res);

    try {
      const testimonials = await Testimonial.findAndCountAll({
        attributes: ['name', 'image', 'content'],
        limit: size,
        offset: page * size,
      });

      let totalPages = pagination.getNumberOfTotalPages(
        testimonials.count,
        size
      );

      if (testimonials.count < 1) {
        return res.status(404).json({
          msg: 'There is no testimonials',
        });
      }

      const { nextPage, previousPage } = pagination.getNextAndPreviousPage(
        page,
        size,
        totalPages
      );

      return res.status(200).json({
        content: testimonials.rows,
        totalPages,
        nextPage,
        previousPage,
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'Error while searching testimonials in db',
      });
    }
  }
  static async deleteTestimonial(req, res) {
    const { id } = req.params;
    try {
      const testimonial = await TestimonialDao.deleteTestimonial(id);
      testimonial
        ? res.status(200).json({ msg: 'Testimonial deleted successfully' })
        : res.status(400).json({ msg: 'Could not find testimonial' });
    } catch (error) {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  }
}

module.exports = TestimonialController;
