const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const { New } = require('../models');
const RoleMiddleware = require('../middlewares/verify-role');
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
    it('Get news error when id is not int', async () => {
      const idFake = 'a';
      sandbox.stub(New, 'findAll').resolves([]);
      const response = await request(app).get(`/news/${idFake}`).expect(400);

      expect(response.body.errors.errors[0])
        .to.have.property('msg')
        .to.equal('id must be a number');
    });
    it('Get news with params id successful', async () => {
      const idFake = 1;
      const fakeResponse = [
        {
          id: 15,
          name: 'Title Example',
          content: 'Content for a new with title 1',
          image:
            'https://is2-ssl.mzstatic.com/image/thumb/Purple112/v4/8b/a3/e9/8ba3e910-a240-549d-302c-7dacba2923d2/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png',
          CategoryId: 1,
        },
      ];

      sandbox.stub(New, 'findByPk').resolves(fakeResponse);
      const response = await request(app).get(`/news/${idFake}`).expect(200);
      expect(response.body).to.eql(fakeResponse);
    });
    it('Get/id news when throw error 500', async () => {
      sandbox.stub(New, 'findAll').rejects({});

      const response = await request(app).get('/news/1').expect(500);
    });
  });
  context('GET /news', () => {
    it('Get get all news', async () => {
      const fakeResponse = [
        {
          id: 2345434543,
          name: 'Title Example',
          content: 'Content for a new with title 1',
          image:
            'https://is2-ssl.mzstatic.com/image/thumb/Purple112/v4/8b/a3/e9/8ba3e910-a240-549d-302c-7dacba2923d2/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png',
          CategoryId: 1,
        },
      ];

      sandbox.stub(New, 'findAll').resolves(fakeResponse);
      const res = await request(app).get('/news').expect(200);
      expect(res.body.length).to.equal(1);
      expect(res.body).to.eql(fakeResponse);
    });
    it('Get news when throw error 500', async () => {
      sandbox.stub(New, 'findAll').rejects({});

      const response = await request(app).get('/news').expect(500);
    });
  });
  context('POST /news', () => {
    it('POST news successfully', async () => {
      const fakerequest = {
        name: 'newName343',
        content: 'newContent',
        image: 'urlImage',
      };

      sandbox.stub(New, 'create').resolves(fakerequest);
      const res = await request(app)
        .post('/news')
        .send(fakerequest)
        .expect(200);
      expect(res.body).to.eql({ msg: 'New created successfully' });
    });
    it('POST news when throw error 500', async () => {
      const fakerequest = {
        name: 'newName',
        content: 'newContent',
        image: 'urlImage',
      };
      sandbox.stub(New, 'create').rejects({});

      const response = await request(app)
        .post('/news')
        .send(fakerequest)
        .expect(500);
    });
    it('POST news error with errors in req.body', async () => {
      const fakerequest = {
        name: 6,
        content: 4,
        image: 8,
      };
      sandbox.stub(New, 'create').rejects({});

      const response = await request(app)
        .post('/news')
        .send(fakerequest)
        .expect(400);
      expect(response.body).to.have.property('errors');
    });
  });
  context('PUT /news/:id successfully', () => {
    it('PUT news ', async () => {
      const idFake = 2;
      const fakerequest = {
        name: 'new test',
        image: 'test233',
        CategoryId: 8,
        type: null,
      };

      sandbox.stub(New, 'update').resolves([1]);
      sandbox.stub(New, 'findByPk').resolves(fakerequest);
      const res = await request(app)
        .put(`/news/${idFake}`)
        .send(fakerequest)
        .expect(201);
      expect(res.body).to.eql(fakerequest);
    });
    it('PUT news when throw error 500', async () => {
      const idFake = 2;
      const fakerequest = {
        name: 'new test',
        image: 'test233',
        CategoryId: 8,
      };
      sandbox.stub(New, 'update').rejects({});
      sandbox.stub(New, 'findByPk').resolves(fakerequest);

      const response = await request(app)
        .put(`/news/${idFake}`)
        .send(fakerequest)
        .expect(500);
    });

    it('PUT news error with errors in req.body', async () => {
      const idFake = 2;
      const fakerequest = {
        name: 234,
        image: 4,
        CategoryId: 8,
      };
      sandbox.stub(New, 'create').rejects();
      sandbox.stub(New, 'findByPk').resolves(fakerequest);

      const response = await request(app)
        .put(`/news/${idFake}`)
        .send(fakerequest)
        .expect(400);
      expect(response.body).to.have.property('errors');
    });
  });
});
