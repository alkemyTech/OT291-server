const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('../app');
chai.use(chaiHttp);

//Modules
const Login = require('../controllers/authentication');
const Register = require('../controllers/user-controller');
const ValidatejWtUser = require('../middlewares/verify-role-user');
const Token = require('../helpers/Token');

describe('Authentication ROUTE test', function () {
  const register = '/auth/register';
  const login = '/auth/login';
  const me = '/auth/me';
  const user = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    password: 'test',
  };

  const preUser = {
    firstName: 'unit',
    lastName: 'unit',
    email: 'unit@unit.com',
    password: 'unit',
  };

  before(async () => {
    const result = await chai.request(server).post(register).send(preUser);
    expect(result.status).to.equal(200);
  });

  describe('POST /auth/register', () => {
    it('should crete new user if email not found', async () => {
      try {
        const tokenUser = Token.generateJWT(user.email);
        const result = await chai.request(server).post(register).send(user);
        expect(result.status).to.equal(200);
        expect(result.body).not.to.be.empty;
        expect(result.body.token).to.be.equal(tokenUser);
      } catch (error) {
        console.log(error);
      }
    });

    it('should return 403 if email was found', async () => {
      try {
        await chai.request(server).post(register).send(user);
      } catch (error) {
        expect(error.status).to.equal(500);
        expect(error.response.text).to.equal('{"msg":"Could not create user"}');
      }
    });
  });
});

// context('POST /auth/register', function () {});
// context('POST /auth/login', function () {});
// context('GET /auth/me', function () {});
