const { Slide } = require('../models');

class SlideHelper {
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
