const SlidesDao = require('../dao/slide');
const UploadFiles = require('../helpers/UploadFiles.js');
const FileManager = require('../helpers/FileManager.js');

class SlidersController {
  static async getDetails(req, res) {
    const { id } = req.params;
    try {
      const where = { id: id };

      const slideData = await SlidesDao.findSlide({
        where: where,
      });

      if (!slideData) {
        res.status(404).json({ message: 'Could not find the slide' });
      } else {
        res.status(200).json(slideData);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async getSlides(req, res) {
    const attributes = ['imageUrl', 'order'];

    try {
      const response = await SlidesDao.getSlides(attributes);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        error,
        msg: 'error in db',
      });
    }
  }

  static async deleteSlide(req, res) {
    const { id } = req.params;
    const where = { id } ;
    
    try {
      const response = await SlidesDao.deleteSlides(where);
      
      response ? res.status(200).json({ msg: 'Slide deleted successfully' })
      : res.status(404).json({ msg: 'Could not find Slide' })

    } catch (error) {
      return res.status(500).json({
        error,
        msg: 'error in db',
      });
    }
  }

  static async postSlide(req, res) {
    const { base64Image, text } = req.body;
    let { order } = req.body;
    let decodedImage;

    try {
      decodedImage = await UploadFiles.decodeImage(base64Image)
    } catch(error) {
      res.status(400).json({ msg: 'Could not decode image' })
    }

    if (!order) {
      order = (await SlidesDao.sortSlides('order', 'DESC')).map(o => o.order)[0] + 1
      console.log(typeof order, 'TIPO DE ORDER')
    }

    try {
      const newSlide = await SlidesDao.createSlide(
        {
          imageUrl: 'hola',
          order,
          text,
        },
        [ 'imageUrl', 'order', 'text' ]
      );
      res.status(200).json({ msg: 'Slide created successfully' })
    } catch (error) {
      res.status(400).json({ msg: 'Could not create a slide' })
    }
  }
}

module.exports = SlidersController;
