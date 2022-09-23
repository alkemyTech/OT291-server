'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Usuario',
          lastName: 'Demo',
          email: 'test@test.com',
          // Important: Password not encrypted yet!
          password:
            '$2b$12$RfTwG8ICXMUiFLegJ1/Ns.q5hXFKyQiFST6K3OLsEDYA2g6VHWH7K',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Login',
          lastName: 'Demo',
          email: 'login@test.com',
          // Important: Password encrypted!
          password:
            '$2b$12$fTNoSlSZ0FS9jOEmz9P/q.ZdWle2ZOaUa.oZG2Qm3u1lERnFjT5Y6',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  },
};
