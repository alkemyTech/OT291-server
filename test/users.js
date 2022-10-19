const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const request = require('supertest');
const { User } = require('../models');
const sandbox = sinon.createSandbox();
const rewire = require('rewire');
//const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const RoleMiddleware = require('../middlewares/verify-role');

describe('User', () => {

  beforeEach(() => {
    fakeAuth = (req, res, next) => next()
    authStub = sandbox.stub(RoleMiddleware, 'isAdminRole').callsFake(fakeAuth);

    app = rewire('../app')
  });

  afterEach(() => {
    app = rewire('../app')
    sandbox.restore();
  });

  context('DELETE /users/:id', () => {
    it('Should delete a user successfully', async () => {
      sandbox.stub(User, 'destroy').resolves(1);
      const response = await request(app).delete('/users/1');

      expect(response.status).to.equal(200);
      expect(response.body)
        .to.have.property('msg')
        .to.equal('User deleted successfully');
    });

    it('Should response with 404 status if user does not exist', async () => {
      sandbox.stub(User, 'destroy').resolves(0);
      const response = await request(app).delete('/users/123');

      expect(response.status).to.equal(404);
      expect(response.body)
        .to.have.property('msg')
        .to.equal('Could not find user');
    });
  });

  context('GET /users/users', () => {
    it('Should return a list of users', async () => {
      const usersList = [
        {
          id: 1,
          firstName: 'usuarioAdmin1',
          lastName: 'Demo1',
          email: 'test1@admin.com',
        },
        {
          id: 2,
          firstName: 'usuarioAdmin2',
          lastName: 'Demo2',
          email: 'test2@admin.com',
        },
      ];

      sandbox.stub(User, 'findAll').resolves(usersList);
      const response = await request(app).get('/users/users');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(usersList);
    });

    it('Should response with 404 if there is not users', async () => {
      sandbox.stub(User, 'findAll').resolves([]);
      const response = await request(app).get('/users/users');

      expect(response.status).to.equal(404);
      expect(response.body)
        .to.have.property('msg')
        .to.equal('Could not find users');
    });

    it('Should throw an error if user\'s table does not exist', async () => {
      sandbox.stub(User, 'findAll').throws();
      const response = await request(app).get('/users/users');

      expect(response.status).to.equal(400);
      expect(response.body)
        .to.have.property('msg')
        .to.equal('Something went wrong');
    });
  });
});


describe('Users isOwner', () => {

  beforeEach(() => {
    fakeAuth = (req, res, next) => next()
    authOwnerStub = sandbox.stub(RoleMiddleware, 'isOwner').callsFake(fakeAuth);

  });

  afterEach(() => {
    app = rewire('../app')
    sandbox.restore();
  });

  context('PATCH /users/:id', () => {

      xit('Should update user successfully', async () => {
        sandbox.stub(User, 'update').resolves([1]);
        const response = await request(app).patch('/users/1')
          .send({
          firstName: 'test',
          lastName: 'test test',
          email: 'test@gmail.com',
          password: 'something',
        });

        expect(response.status).to.equal(200);
        expect(response.body)
          .to.have.property('msg')
          .to.equal('User update successfully');
      });

    xit('Should response with 404 if user does not exist', async () => {
      sandbox.stub(User, 'update').resolves([0]);
      const response = await request(app).patch('/users/123')
          .send({
          firstName: 'test',
          lastName: 'test test',
          email: 'test@gmail.com',
          password: 'something',
        });

      expect(response.status).to.equal(404)
      expect(response.body)
        .to.have.property('msg')
        .to.equal('Could not find user')
    })

    xit('Should throw an error if user does not exist', async () => {
      sandbox.stub(User, 'update').throws();
      const response = await request(app).patch('/users/1')
          .send({
          firstName: 'test',
          lastName: 'test test',
          email: 'test@gmail.com',
          password: 'something',
        });

      expect(response.status).to.equal(400)
      expect(response.body)
        .to.have.property('msg')
        .to.equal('Something went wrong')
    })
  });
});
