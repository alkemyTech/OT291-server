'use strict';

const { DATE } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'category1',
          description: 'description category 1',
          image: 'urlCategory1Img',
          deletedAt: new Date,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'category2',
          description: 'description category 2',
          image: 'urlCategory2Img',
          deletedAt: new Date,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
