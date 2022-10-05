'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        user_id : 1,
        body:'Comentario 01',
        post_id: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id : 1,
        body:'Comentario 02',
        post_id: 2,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id : 2,
        body:'Comentario 03',
        post_id: 1,
        createdAt: new Date,
        updatedAt: new Date
      },

      {
        user_id : 2,
        body:'Comentario 04',
        post_id: 2,
        createdAt: new Date,
        updatedAt: new Date
      }], {});
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Comments', null, {});
  }
};
