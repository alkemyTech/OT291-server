const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const { Organization } = require('../models');
const RoleMiddleware = require('../middlewares/verify-role');
const SlidesDao = require('../dao/slide');

const sandbox = sinon.createSandbox();

describe('organization', () => {
  beforeEach(() => {
    sandbox
      .stub(RoleMiddleware, 'isAdminRole')
      .callsFake((req, res, next) => next());
    app = rewire('../app');
  });
  afterEach(() => {
    app = rewire('../app');
    sandbox.restore();
  });

  context('GET /organization/public', () => {
    it('Get organization information', (done) => {
      sandbox.stub(Organization, 'findOne').resolves({
        id: 1,
        name: 'Big Org',
        image: 'Lorem img BigOrg',
        phone: 123123123,
        address: 'Street one BigOrg',
        urlFacebook: 'https://es-la.facebook.com/AlkemyLATAM/',
        urlInstagram: 'https://www.instagram.com/alkemy__/',
        urlLinkedin: 'https://www.linkedin.com/company/alkemy2020/',
      });
      sandbox.stub(SlidesDao, 'findSlidebyOrganization').resolves({
        slides: [
          {
            id: 1,
            imageUrl:
              'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            test: 'this is a text',
            order: 1,
            organizationId: 1,
          },
        ],
      });
      request(app)
        .get('/organization/public')
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property('response');
          expect(response.body).to.have.property('slides');
          done(err);
        });
    });

    it('Cannot obtain organization info', (done) => {
      sandbox.stub(Organization, 'findOne').resolves(null);
      sandbox.stub(SlidesDao, 'findSlidebyOrganization').resolves(null);
      request(app)
        .get('/organization/public')
        .expect(500)
        .end((err, response) => {
          expect(response.body).to.have.property('msg').to.equal('Error in db');
          done(err);
        });
    });
  });

  context('POST /organization/pubic', () => {
    it('Update organization succesfully', (done) => {
      sandbox.stub(Organization, 'update').resolves([1]);
      request(app)
        .post('/organization/public')
        .send({
          name: 'Big Org',
          image: 'www.image.com/image.jpg',
          phone: 123123123,
          address: 'Street one BigOrg',
          email: 'bigorg@gmail.com',
          welcomeText: 'Welcome to big org',
          aboutUsText: 'We are a great ONG',
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property('msg')
            .to.equal('Organization info has been updated');
          done(err);
        });
    });
    it('There is no organization', (done) => {
      sandbox.stub(Organization, 'update').resolves(null);
      request(app)
        .post('/organization/public')
        .send({
          name: 'Big Org',
          image: 'www.image.com/image.jpg',
          phone: 123123123,
          address: 'Street one BigOrg',
          email: 'bigorg@gmail.com',
          welcomeText: 'Welcome to big org',
          aboutUsText: 'We are a great ONG',
        })
        .expect(404)
        .end((err, response) => {
          expect(response.body)
            .to.have.property('msg')
            .to.equal('There is no organization');
          done(err);
        });
    });
  });
});
