'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Members', [{
      name: 'Member',
      facebookUrl: 'https://www.facebook.com/member/',
      instagramUrl: 'https://www.instagram.com/member/',
      linkedinUrl: 'https://www.linkedin.com/member/',
      description: "this is a description",
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date,
    },
    {
      name: 'Member1',
      facebookUrl: 'https://www.facebook.com/member1/',
      instagramUrl: 'https://www.instagram.com/member1/',
      linkedinUrl: 'https://www.linkedin.com/member1/',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date,
    }, {
      name: 'Member2',
      facebookUrl: 'https://www.facebook.com/member2/',
      instagramUrl: 'https://www.instagram.com/member2/',
      linkedinUrl: 'https://www.linkedin.com/member2/',
      description: "this is a description",
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date,
    }
      , {
      name: 'Member3',
      facebookUrl: 'https://www.facebook.com/member3/',
      instagramUrl: 'https://www.instagram.com/member3/',
      linkedinUrl: 'https://www.linkedin.com/member3/',
      description: "this is a description",
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date,
    }
      , {
      name: 'Member4',
      facebookUrl: 'https://www.facebook.com/member4/',
      instagramUrl: 'https://www.instagram.com/member4/',
      linkedinUrl: 'https://www.linkedin.com/member4/',
      description: "this is a description",
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date,
    }
      , {
      name: 'Member5',
      facebookUrl: 'https://www.facebook.com/member5/',
      instagramUrl: 'https://www.instagram.com/member5/',
      linkedinUrl: 'https://www.linkedin.com/member5/',
      description: "this is a description",
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date,
    },
    {
      name: 'Member6',
      facebookUrl: 'https://www.facebook.com/member6/',
      instagramUrl: 'https://www.instagram.com/member6/',
      linkedinUrl: 'https://www.linkedin.com/member6/',
      description: "this is a description",
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date,
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Members', null, {});
  }
};
