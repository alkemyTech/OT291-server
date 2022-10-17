const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

//MODELS
const { User } = require('../models');
const bcrypt = require('bcrypt');
const LoginController = require('../controllers/authentication');
const RegisterController = require('../controllers/user-controller');
const AuthDao = require('../dao/authentication');
const Token = require('../helpers/Token');
const NotifyViaEmail = require('../services/notifyViaEmail');

describe('Authentication Unit Test', () => {
  describe('Register Controller', () => {
    context('Context of success', () => {
      beforeEach(() => {
        this.mockReq = {
          body: {
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
            password: 'hash',
          },
        };

        this.mockRes = {
          json: function (body) {
            this.body = body;
            return this;
          },
          status: function (status) {
            this.status = status;
            return this;
          },
        };
        this.stubToken = sinon.stub(Token, 'generateJWT').resolves('token');
        this.stubBvrypt = sinon.stub(bcrypt, 'hashSync').resolves('hash');
        this.stubDb = sinon.stub(User, 'create').resolves(this.mockReq.body);
        this.stubEmail = sinon.stub(NotifyViaEmail, 'sendEmail').resolves(true);
      });

      afterEach(() => {
        expect(this.mockRes.status).to.be.equal(200);
        expect(this.mockRes.body).to.have.property('firstName');
        expect(this.mockRes.body).to.have.property('lastName');
        expect(this.mockRes.body).to.have.property('email');
        expect(this.mockRes.body).to.have.property('token');
        sinon.restore();
      });

      it('Should create a token using the generateJWT function with a email', async () => {
        await RegisterController.post(this.mockReq, this.mockRes);
        expect(this.stubToken.calledWith(this.mockReq.body.email)).to.be.true;
      });
      it('Should call to send Grid function one time with a email', async () => {
        await RegisterController.post(this.mockReq, this.mockRes);
        expect(this.stubEmail.calledWith(this.mockReq.body.email)).to.be.true;
        expect(this.stubEmail.calledOnce).to.be.true;
      });
      it('Should create a token using the bcrypt function with a email', async () => {
        await RegisterController.post(this.mockReq, this.mockRes);
        expect(this.stubBvrypt.calledWith(this.mockReq.body.password)).to.be
          .true;
        expect(this.stubEmail.calledOnce).to.be.true;
      });
      it('Should create a User using the User.create function with a object', async () => {
        await RegisterController.post(this.mockReq, this.mockRes);
        expect(this.stubDb.calledOnce).to.be.true;
      });
    });

    context('Context of errors', () => {
      beforeEach(() => {
        mockReq = {
          body: {
            firstName: 'test',
            lastName: 'test',
          },
        };
        this.mockRes = {
          json: function (body) {
            this.body = body;
            return this;
          },
          status: function (status) {
            this.status = status;
            return this;
          },
        };
      });

      afterEach(() => {
        expect(this.mockRes.status).to.be.equal(500);
        expect(this.mockRes.body).to.have.property('msg');
        sinon.restore();
      });

      it('Should throw Error when no email are passed in generateJWT function', async () => {
        this.stubToken = sinon.stub(Token, 'generateJWT').throws();
        await RegisterController.post(mockReq, this.mockRes);
        expect(this.stubToken).to.be.throw;
      });

      it('Should throw Error when no password are passed in hashSync function', async () => {
        this.stubBvrypt = sinon.stub(bcrypt, 'hashSync').rejects();
        await RegisterController.post(mockReq, this.mockRes);
        expect(this.stubBvrypt).to.be.throw;
      });
    });
  });
  describe('Login Controller', () => {
    context('Context of success', () => {
      beforeEach(() => {
        this.mockReq = {
          body: {
            email: 'test@test.com',
            password: 'hash',
          },
        };

        this.mockRes = {
          json: function (body) {
            this.body = body;
            return this;
          },
          status: function (status) {
            this.status = status;
            return this;
          },
        };
        this.stubToken = sinon.stub(Token, 'generateJWT').resolves('token');
        this.stubBvrypt = sinon.stub(bcrypt, 'compareSync').resolves(true);
        this.stubDb = sinon
          .stub(AuthDao, 'findUser')
          .resolves(this.mockReq.body);
      });

      afterEach(() => {
        expect(this.mockRes.status).to.be.equal(200);
        expect(this.mockRes.body).to.have.property('user');
        expect(this.mockRes.body).to.have.property('token');
        sinon.restore();
      });

      it('Should call the generateJWT function once', async () => {
        await LoginController.loginUser(this.mockReq, this.mockRes);
        expect(this.stubBvrypt.calledOnce).to.be.true;
      });

      it('Should call the compareSync function once', async () => {
        await LoginController.loginUser(this.mockReq, this.mockRes);
        expect(this.stubToken.calledOnce).to.be.true;
      });

      it('Should call the dao.findUser function once', async () => {
        await LoginController.loginUser(this.mockReq, this.mockRes);
        expect(this.stubDb.calledOnce).to.be.true;
      });
    });

    context('Context of errors', () => {
      beforeEach(() => {
        this.mockRes = {
          json: function (body) {
            this.body = body;
            return this;
          },
          status: function (status) {
            this.status = status;
            return this;
          },
        };
      });

      afterEach(() => {
        expect(this.mockRes.status).to.be.equal(400);
        sinon.restore();
      });

      it('Should throw if the DB throws an error', async () => {
        const mockReq = {
          body: {
            email: 'test@test.com',
            password: 'hash',
          },
        };
        this.stubDb = sinon.stub(AuthDao, 'findUser').rejects('User not found');
        await LoginController.loginUser(mockReq, this.mockRes);
        expect(this.stubDb).to.be.throw;
        expect(this.mockRes.body).to.be.throw;
      });

      it('Should throw error if the password is wrong', async () => {
        const mockReq = {
          body: {
            email: 'test@test.com',
            password: 'pass',
          },
        };
        this.stubDb = sinon
          .stub(AuthDao, 'findUser')
          .resolves(this.mockReq.body);
        this.bcrypt = sinon
          .stub(bcrypt, 'compareSync')
          .throwsException('Password not equal');
        await LoginController.loginUser(mockReq, this.mockRes);
        expect(this.bcrypt).to.be.throw;
        expect(this.mockRes.body).to.be.throw;
      });
    });
  });
  describe('Me Controller', () => {
    context('Context of success', () => {
      beforeEach(() => {
        this.mockReq = {
          body: {
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
            image: 'image',
          },
        };

        this.mockRes = {
          json: function (body) {
            this.body = body;
            return this;
          },
          status: function (status) {
            this.status = status;
            return this;
          },
        };

        this.stubDb = sinon
          .stub(AuthDao, 'findUser')
          .resolves(this.mockReq.body);
      });

      afterEach(() => {
        expect(this.mockRes.status).to.be.equal(200);
        expect(this.mockRes.body).to.have.property('firstName');
        expect(this.mockRes.body).to.have.property('lastName');
        expect(this.mockRes.body).to.have.property('email');
        expect(this.mockRes.body).to.have.property('image');
        sinon.restore();
      });

      it('Should call the dao.findUser function once', async () => {
        await RegisterController.getData(this.mockReq, this.mockRes);
        expect(this.stubDb.calledOnce).to.be.true;
      });
    });

    context('Context of errors', () => {
      beforeEach(() => {
        this.mockRes = {
          json: function (body) {
            this.body = body;
            return this;
          },
          status: function (status) {
            this.status = status;
            return this;
          },
        };
      });

      afterEach(() => {
        expect(this.mockRes.status).to.be.equal(404);
        expect(this.mockRes.body).to.have.property('msg');
        sinon.restore();
      });

      it('Should send a error if no user in the databese', async () => {
        const mockReq = {
          body: {
            email: 'test@test.com',
          },
        };
        this.stubDb = sinon.stub(AuthDao, 'findUser').rejects('User not found');
        await RegisterController.getData(mockReq, this.mockRes);
        expect(this.stubDb).to.be.throw;
        expect(this.mockRes.body).to.be.throw;
      });
    });
  });
});
