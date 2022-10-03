'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Organizations',
      [
        {
          name: 'Big Org',
          image: 'Lorem img BigOrg',
          address: 'Street one BigOrg',
          phone: 123123123,
          email: 'bigorg@mail.com',
          welcomeText: 'Welcome to BigOrg',
          aboutUsText: 'About BigOrg',
          urlFacebook: 'https://es-la.facebook.com/AlkemyLATAM/',
          urlInstagram: 'https://www.instagram.com/alkemy__/',
          urlLinkedin: 'https://www.linkedin.com/company/alkemy2020/',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Small Org',
          image: 'Lorem img SmallOrg',
          address: null,
          phone: null,
          email: 'smallorg@mail.com',
          welcomeText: 'Welcome to SmallOrg',
          urlFacebook: 'https://es-la.facebook.com/AlkemyLATAM/',
          urlInstagram: 'https://www.instagram.com/alkemy__/',
          urlLinkedin: 'https://www.linkedin.com/company/alkemy2020/',
          aboutUsText: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organizations', null, {});
  },
};
