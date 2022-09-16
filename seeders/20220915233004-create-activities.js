'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Activities',
      [
        {
          name: 'Activity example 1',
          content: 'Content activity example 1',
          image: 'image activity example 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Activity example 2',
          content: 'Content activity example 2',
          image: 'image activity example 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Activities', null, {});
  },
};
