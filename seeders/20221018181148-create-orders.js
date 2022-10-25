'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          category: 'singleDonation',
          amount: 2,
          userEmail: 'test1@admin.com',
          paymentLink: 'asdasd2dw312mnjkasndu91',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'recurrentDonation',
          amount: 1,
          userEmail: 'test2@admin.com',
          paymentLink: 'asdasd2dw312mnjkasndu91',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
