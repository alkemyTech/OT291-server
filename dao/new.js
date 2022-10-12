const { New } = require('../models');

class NewDao {
  static async findNewById(pk) {
    try {
      const newData = await New.findByPk(pk);
      return newData;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async postNew(data) {
    try {
      data.type = 'news';
      const { name, content, image, type } = data;
      const newCreated = await New.create({ name, content, image, type });
      return newCreated;
    } catch (error) {
      throw new Error(error);
    }
  }
  static async updateNew(name, image, content, CategoryId, id) {
    try {
      await New.update(
        {
          name,
          image,
          content,
          CategoryId,
        },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }
  static async findAllNewsPages(attributes) {
    try {
      const newsData = await New.findAndCountAll({
        attributes,
      });
      return newsData;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = NewDao;
