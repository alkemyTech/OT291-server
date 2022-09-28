'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let news = [
      {
        name: 'Title 1 Example',
        content: 'Content for a new with title 1',
        Image:
          'https://is2-ssl.mzstatic.com/image/thumb/Purple112/v4/8b/a3/e9/8ba3e910-a240-549d-302c-7dacba2923d2/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png',
        CategoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Title 2 Example',
        content: 'Content for a new with title 2',
        Image:
          'https://previews.123rf.com/images/alhovik/alhovik1709/alhovik170900028/86470277-antecedentes-de-las-noticias-de-%C3%BAltima-hora-world-global-tv-news-banner-design.jpg',
<<<<<<< HEAD
        categorieId: 1,
=======
        CategoryId: 1,
>>>>>>> 90a3586d05669d88ef488d7f2e4b3c5dde98af8a
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('News', news, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('News', null, {});
  },
};
