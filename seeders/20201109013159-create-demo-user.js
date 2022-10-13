'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'usuarioAdmin1',
          lastName: 'Demo1',
          email: 'test1@admin.com',
          // Important: Password not encrypted yet!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioAdmin2',
          lastName: 'Demo2',
          email: 'test2@admin.com',
          // Important: Password encrypted!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioAdmin3',
          lastName: 'Demo3',
          email: 'test3@admin.com',
          // Important: Password encrypted!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioAdmin4',
          lastName: 'Demo4',
          email: 'test4@admin.com',
          // Important: Password encrypted!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioAdmin5',
          lastName: 'Demo5',
          email: 'test5@admin.com',
          // Important: Password encrypted!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioAdmin6',
          lastName: 'Demo6',
          email: 'test6@admin.com',
          // Important: Password encrypted!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioAdmin7',
          lastName: 'Demo7',
          email: 'test7@admin.com',
          // Important: Password encrypted!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioAdmin8',
          lastName: 'Demo8',
          email: 'test8@admin.com',
          // Important: Password encrypted!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioAdmin9',
          lastName: 'Demo9',
          email: 'test9@admin.com',
          // Important: Password encrypted!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioAdmin10',
          lastName: 'Demo10',
          email: 'test10@admin.com',
          // Important: Password encrypted!
          password: '$2b$10$HrrlTKhyujIgtvjU6VV4f.PPQe1QRa1Ap6dI902IC52xE7/if9PYi',
          roleId: 1,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar1',
          lastName: 'Demo1',
          email: 'test1@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar2',
          lastName: 'Demo2',
          email: 'test2@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar3',
          lastName: 'Demo3',
          email: 'test3@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar4',
          lastName: 'Demo4',
          email: 'test4@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar5',
          lastName: 'Demo5',
          email: 'test5@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar6',
          lastName: 'Demo6',
          email: 'test6@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar7',
          lastName: 'Demo7',
          email: 'test7@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar8',
          lastName: 'Demo8',
          email: 'test8@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar9',
          lastName: 'Demo9',
          email: 'test9@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
          image:
            'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'usuarioStandar10',
          lastName: 'Demo10',
          email: 'test10@user.com',
          // Important: Password encrypted!
          password: '$2b$08$6hbxZ2Z3lLc3X8S0sgZXeumElLF4zmCW9NSBEPjrSKWJUYooio/Oy',
          roleId: 2,
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
