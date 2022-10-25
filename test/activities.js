const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const { Activities } = require('../models');
const RoleMiddleware = require('../middlewares/verify-role');
const sandbox = sinon.createSandbox();

describe('activities', () => {
  beforeEach(() => {
    fakeAuth = (req, res, next) => {
      return next();
    };
    authStub = sandbox.stub(RoleMiddleware, 'isAdminRole').callsFake(fakeAuth);
    app = rewire('../app');
  });

  afterEach(() => {
    app = rewire('../app');
    sandbox.restore();
  });

  context('POST /activities', () => {
    it('Post a activity with error', (done) => {
      request(app)
        .post('/activities')
        .send({
          name: 'activity test8585',
          content: 'content test2343',
          image: '',
        })
        .expect(400)
        .end((err, response) => {
          expect(response.body.errors.errors[0])
            .to.have.property('msg')
            .to.equal('Image has to be a image URL');
          expect(response.body.errors.errors[1])
            .to.have.property('msg')
            .to.equal('Image is required');
          done(err);
        });
    });
    it('Post a activity successfully', (done) => {
      sandbox.stub(Activities, 'create').resolves({
        name: 'activity test8585',
        content: 'content test2343',
        image:
          'https://images.pexels.com/photos/6646945/pexels-photo-6646945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      });
      request(app)
        .post('/activities')
        .send({
          name: 'activity test8585',
          content: 'content test2343',
          image:
            'https://images.pexels.com/photos/6646945/pexels-photo-6646945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        })
        .expect(201)
        .end((err, response) => {
          expect(response.body)
            .to.have.property('msg')
            .to.equal('activity created successfully');
          expect(response.body.activity)
            .to.have.property('name')
            .to.equal('activity test8585');
          expect(response.body.activity)
            .to.have.property('content')
            .to.equal('content test2343');
          expect(response.body.activity)
            .to.have.property('image')
            .to.equal(
              'https://images.pexels.com/photos/6646945/pexels-photo-6646945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            );
          done(err);
        });
    });
  });
  context('PUT /activities/:id', () => {
    it('Put a activity with error', (done) => {
      request(app)
        .put('/activities/1')
        .send({
          name: 1234,
          content: true,
          image:
            'https://images.pexels.com/photos/6646945/pexels-photo-6646945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        })
        .expect(400)
        .end((err, response) => {
          expect(response.body.errors.errors[0])
            .to.have.property('msg')
            .to.equal('Name has to be a string');
          expect(response.body.errors.errors[1])
            .to.have.property('msg')
            .to.equal('Content has to be a image URL');
          done(err);
        });
    });
    it('Put a activity successfully', (done) => {
      sandbox.stub(Activities, 'update').resolves([1]);
      request(app)
        .put('/activities/1')
        .send({
          name: 'activity test8585',
          content: 'content test2343',
          image:
            'https://images.pexels.com/photos/6646945/pexels-photo-6646945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body.activities)
            .to.have.property('name')
            .to.equal('activity test8585');
          expect(response.body.activities)
            .to.have.property('content')
            .to.equal('content test2343');
          expect(response.body.activities)
            .to.have.property('image')
            .to.equal(
              'https://images.pexels.com/photos/6646945/pexels-photo-6646945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            );
          done(err);
        });
    });
  });
});
