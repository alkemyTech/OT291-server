const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const New = require('../models');
const RoleMiddleware = require('../middlewares/verify-role');
const { response , req } = require('express');
const News = require('../controllers/news');
const sandbox = sinon.createSandbox();

describe('News', () => {
  beforeEach(() => {
    fakeAuth = (req, res, next) => {
      return next();
    };

    authStub = sandbox.stub(RoleMiddleware, 'isAdminRole').callsFake(fakeAuth);
    app = rewire('../app');
  });

  afterEach(() => {
    sandbox.restore();
    app = rewire('../app');
  });

  context('GET /news/:id', () => {
    it('Get news when id is not int', (done) => {
      request(app)
        .get(`/news/a`)
        .expect(400)
        .end((err, response) => {
          expect(response.body.errors.errors[0])
            .to.have.property('msg')
            .to.equal('id must be a number');
          done(err);
        });
    });
    it('Get news with error in try catch', (done) => {
        const mError = new Error('stub: Internal server error');
        const DetailNewStub =  sandbox.stub( News , 'DetailNew').rejects(mError)
        const parameters = (req , response)

      request(app)
        .get(`/news/1`)
        sinon.assert.calledWith(DetailNewStub , parameters)
        .expect(500)
        .end((err, response) => {
          expect(response.body).to.be.equal('stub: Internal server error');
        });
    });
  });
});
