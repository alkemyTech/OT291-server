'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Organizations', 'urlFacebook', {
      type: Sequelize.STRING,
    }),
      await queryInterface.addColumn('Organizations', 'urlInstagram', {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn('Organizations', 'urlLinkedin', {
        type: Sequelize.STRING,
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Organizations', 'urlFacebook'),
      await queryInterface.removeColumn('Organizations', 'urlInstagram'),
      await queryInterface.removeColumn('Organizations', 'urlLinkedin');
  },
};
