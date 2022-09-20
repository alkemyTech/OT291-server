'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Testimonials', [{
      name: "NameExample1",
      image: "urlImage.com",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, aperiam.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "NameExample2",
      image: "urlImage2.com",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, aperiam.",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Testimonials', null, {});
  }
};
