const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const RoleMiddleware = require('../middlewares/verify-role');
const sandbox = sinon.createSandbox();
const TestimonialDao = require('../dao/testimonials');

describe('Testimonials', () => {
  beforeEach(() => {
    authStub = sandbox
      .stub(RoleMiddleware, 'isAdminRole')
      .callsFake((req, res, next) => next());
    app = rewire('../app');
  });

  afterEach(() => {
    app = rewire('../app');
    sandbox.restore();
  });

  context('GET /testimonials', () => {
    it('Get all testimonials', (done) => {
      sandbox.stub(TestimonialDao, 'getTestimonials').resolves([
        {
          name: 'activity test8585',
          content: 'content test2343',
          image:
            'https://images.pexels.com/photos/6646945/pexels-photo-6646945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
      ]);

      request(app)
        .get('/testimonials')
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.have.property('testimonials');
          done(err);
        });
    });
    it('Cannot get testimonials', (done) => {
      sandbox.stub(TestimonialDao, 'getTestimonials').resolves(null);
      request(app)
        .get('/testimonials')
        .expect(404)
        .end((err, response) => {
          expect(response.body)
            .to.have.property('msg')
            .to.equal('There is no testimonials');

          done(err);
        });
    });
  });

  context('DELETE Testimonial', () => {
    it('Delete one testimonial succesfully', (done) => {
      sandbox.stub(TestimonialDao, 'deleteTestimonial').resolves(1);

      request(app)
        .delete('/testimonials/1')
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property('msg')
            .to.equal('Testimonial deleted successfully');
          done(err);
        });
    });

    it('Cannot found testimonial to delete', (done) => {
      sandbox.stub(TestimonialDao, 'deleteTestimonial').resolves(0);

      request(app)
        .delete('/testimonials/1')
        .expect(400)
        .end((err, response) => {
          expect(response.body)
            .to.have.property('msg')
            .to.equal('Could not find testimonial');
          done(err);
        });
    });
  });

  context('Create one testimonial', () => {
    it('Create one testimonial succesfully', (done) => {
      sandbox.stub(TestimonialDao, 'postTestimonial').resolves({
        name: 'Testimonial1',
        image: 'www.image.com/testimonial.jpg',
        content: 'Content from testimonial 1',
      });

      request(app)
        .post('/testimonials/')
        .send({
          name: 'Testimonial1',
          image: 'www.image.com/testimonial.jpg',
          content: 'Content from testimonial 1',
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body).to.equal('Testimonial created successfully.');
          done(err);
        });
    });
    it('Cannot create testimonial', (done) => {
      sandbox.stub(TestimonialDao, 'postTestimonial').throws('error');
      request(app)
        .post('/testimonials/')
        .send({
          name: 'Testimonial1',
          image: 'www.image.com/testimonial.jpg',
          content: 'Content from testimonial 1',
        })
        .expect(400)
        .end((err, response) => {
          expect(response.body)
            .to.have.property('msg')
            .to.equal('Error while creating testimonial');
          done(err);
        });
    });
  });

  context('Update one testimonial', () => {
    it('Update succesfully', (done) => {
      sandbox.stub(TestimonialDao, 'updateTestimonial').resolves([1]);
      sandbox.stub(TestimonialDao, 'findTestimonial').resolves({
        name: 'Testimonial1',
        image: 'www.image.com/testimonial.jpg',
        content: 'Content from testimonial 1',
      });

      request(app)
        .put('/testimonials/1')
        .send({
          name: 'Testimonial1',
          image: 'www.image.com/testimonial.jpg',
          content: 'Content from testimonial 1',
        })
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.have.property('name')
            .to.equal('Testimonial1');
          expect(response.body)
            .to.have.property('image')
            .to.equal('www.image.com/testimonial.jpg');
          expect(response.body)
            .to.have.property('content')
            .to.equal('Content from testimonial 1');
          done(err);
        });
    });

    it('Could not find testimonial to update', (done) => {
      sandbox.stub(TestimonialDao, 'updateTestimonial').resolves(null);
      sandbox.stub(TestimonialDao, 'findTestimonial').resolves({
        name: 'Testimonial1',
        image: 'www.image.com/testimonial.jpg',
        content: 'Content from testimonial 1',
      });
      request(app)
        .put('/testimonials/1')
        .send({
          name: 'Testimonial1',
          image: 'www.image.com/testimonial.jpg',
          content: 'Content from testimonial 1',
        })
        .expect(404)
        .end((err, response) => {
          expect(response.body)
            .to.have.property('msg')
            .to.equal('could not find Testimonial');
          done(err);
        });
    });
  });
});
