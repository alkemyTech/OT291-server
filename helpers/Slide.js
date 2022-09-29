const { Slide } = require('../models');

class SlideHelper {
  static async orderSlides(order) {
    if (order) return order;

    try {
      const allSlides = await Slide.findAll();
      const slidesOrder = allSlides.map((e) => e.toJSON()).map((o) => o.order);
      order = slidesOrder.length + 1;
      return order;
    } catch (error) {
      return error;
    }
  }
  static decodeImage(imageUrl) {
    try {
      const asciiToBinary = Buffer.from(imageUrl, 'base64').toString('binary');
      return asciiToBinary;
    } catch (error) {
      return error;
    }
  }
}

module.exports = SlideHelper;
