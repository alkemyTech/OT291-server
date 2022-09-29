'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Contacts',
      [
        {
          name: 'Contact1',
          phone: 123456789,
          email: "contact1@gmail.com",
          message:"este es un mensaje de prueba",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Contact2',
          phone: 123456789,
          email: "contact2@gmail.com",
          message:"este es un mensaje de prueba",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Contact3',
          phone: 123456789,
          email: "contact3@gmail.com",
          message:"este es un mensaje de prueba",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Contact4',
          phone: 123456789,
          email: "contact4@gmail.com",
          message:"este es un mensaje de prueba",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Contact5',
          phone: 123456789,
          email: "contact5@gmail.com",
          message:"este es un mensaje de prueba",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Contact6',
          phone: 123456789,
          email: "contact6@gmail.com",
          message:"este es un mensaje de prueba",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Contact7',
          phone: 123456789,
          email: "contact7@gmail.com",
          message:"este es un mensaje de prueba",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contacts', null, {});
  }
};
