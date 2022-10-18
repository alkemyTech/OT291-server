const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const ContactDao = require('../dao/contact');
const RoleMiddleware = require('../middlewares/verify-role');
const sandbox = sinon.createSandbox();

describe('contacts', () => {
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

  context('POST /contacts', () => {
    it('Post a activity with error', (done) => {
      request(app)
        .post('/contacts')
        .send({})
        .expect(400)
        .end((err, response) => {
          expect(response.body.errors.errors[0])
            .to.have.property('msg')
            .to.equal('name has to be a string');
          expect(response.body.errors.errors[1])
            .to.have.property('msg')
            .to.equal('name is required');
          expect(response.body.errors.errors[2])
            .to.have.property('msg')
            .to.equal('must be a email');
          expect(response.body.errors.errors[3])
            .to.have.property('msg')
            .to.equal('email is required');
          done(err);
        });
    });
    it('Post a activity successfully', (done) => {
      sandbox.stub(ContactDao, 'createContact').resolves({
        name: 'nombre1',
        email: 'prueba@gmail.com',
      });
      request(app)
        .post('/contacts')
        .send({
          name: 'nombre1',
          email: 'prueba@gmail.com',
        })
        .expect(201)
        .end((err, response) => {
          expect(response.body).to.have.property('name').to.equal('nombre1');
          expect(response.body)
            .to.have.property('email')
            .to.equal('prueba@gmail.com');
          done(err);
        });
    });
    context('GET /contacts', () => {
      it('Get activities successfully', (done) => {
        sandbox.stub(ContactDao, 'getAllContacts').resolves([
          {
            name: 'Contact1',
            phone: 123456789,
            email: 'contact1@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact2',
            phone: 123456789,
            email: 'contact2@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact3',
            phone: 123456789,
            email: 'contact3@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact4',
            phone: 123456789,
            email: 'contact4@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact5',
            phone: 123456789,
            email: 'contact5@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact6',
            phone: 123456789,
            email: 'contact6@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact7',
            phone: 123456789,
            email: 'contact7@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'asdasd',
            phone: null,
            email: 'alvaro@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'asdasd',
            phone: null,
            email: 'alvaro@gmail.com',
            message: null,
          },
          {
            name: 'asdasd',
            phone: null,
            email: 'alvaro@gmail.com',
            message: null,
          },
        ]);
        request(app)
          .get('/contacts')
          .send({
            name: 'nombre1',
            email: 'prueba@gmail.com',
          })
          .expect(200)
          .end((err, response) => {
            expect(response.body[0])
              .to.have.property('name')
              .to.equal('Contact1');
            expect(response.body[0])
              .to.have.property('email')
              .to.equal('contact1@gmail.com');
            done(err);
          });
      });
      it('Returns the same number of elements', (done) => {
        const res = [
          {
            name: 'Contact1',
            phone: 123456789,
            email: 'contact1@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact2',
            phone: 123456789,
            email: 'contact2@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact3',
            phone: 123456789,
            email: 'contact3@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact4',
            phone: 123456789,
            email: 'contact4@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact5',
            phone: 123456789,
            email: 'contact5@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact6',
            phone: 123456789,
            email: 'contact6@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'Contact7',
            phone: 123456789,
            email: 'contact7@gmail.com',
            message: 'este es un mensaje de prueba',
          },
          {
            name: 'asdasd',
            phone: null,
            email: 'alvaro@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'nombre1',
            phone: null,
            email: 'prueba@gmail.com',
            message: null,
          },
          {
            name: 'asdasd',
            phone: null,
            email: 'alvaro@gmail.com',
            message: null,
          },
          {
            name: 'asdasd',
            phone: null,
            email: 'alvaro@gmail.com',
            message: null,
          },
        ];
        sandbox.stub(ContactDao, 'getAllContacts').resolves(res);
        request(app)
          .get('/contacts')
          .send({})
          .expect(200)
          .end((err, response) => {
            expect(response.body.length).to.equal(res.length);

            done(err);
          });
      });
    });
  });
});
