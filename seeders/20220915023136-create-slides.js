'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Slides', [{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'this is a text',
      order: 1,
      organizationId: 1,
      createdAt: new Date,
      updatedAt: new Date
    },{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'this is a text1',
      order: 2,
      organizationId: 2,
      createdAt: new Date,
      updatedAt: new Date
    },{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'this is a text2',
      order: 3,
      organizationId: 2,
      createdAt: new Date,
      updatedAt: new Date
    },{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'this is a text3',
      order: 4,
      organizationId: 2,
      createdAt: new Date,
      updatedAt: new Date
    },{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'this is a text4',
      order: 5,
      organizationId: 1,
      createdAt: new Date,
      updatedAt: new Date
    },{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'this is a text5',
      order: 6,
      organizationId: 1,
      createdAt: new Date,
      updatedAt: new Date
    },{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'this is a text6',
      order: 7,
      organizationId: 1,
      createdAt: new Date,
      updatedAt: new Date
    },{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'this is a text7',
      order: 8,
      organizationId: 1,
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Slides', null, {});
  }
};
