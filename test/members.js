const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const { Member } = require('../models');
const RoleMiddleware = require('../middlewares/verify-role');
const sandbox = sinon.createSandbox();

describe('members', () => {
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
  let itemMember = {
    name: 'Member',
    facebookUrl: 'https://www.facebook.com/member/',
    instagramUrl: 'https://www.instagram.com/member/',
    linkedinUrl: 'https://www.linkedin.com/member/',
    description: "this is a description",
    image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
  }
  let getAllMembers = [
    {
    name: 'Member 1',
    facebookUrl: 'https://www.facebook.com/member/1',
    instagramUrl: 'https://www.instagram.com/member1/',
    linkedinUrl: 'https://www.linkedin.com/member1/',
    description: "this is a description 1",
    image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community1.png'},
    {
    name: 'Member 2',
    facebookUrl: 'https://www.facebook.com/member2/',
    instagramUrl: 'https://www.instagram.com/member2/',
    linkedinUrl: 'https://www.linkedin.com/member2/',
    description: "this is a description2",
    image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community2.png'},
  ];

  /* POST members */ 
  context('POST /members', () => {
    
    it('Post errors, fields name and image', (done) => {
      request(app)
        .post('/members')
        .send({})
        .expect(400).end((err, response) => {
          expect(response.body.errors.errors[0]).to.have.property('msg').to.equal('Name has to be a string')
          expect(response.body.errors.errors[1]).to.have.property('msg').to.equal('Name is required') 
          expect(response.body.errors.errors[2]).to.have.property('msg').to.equal('Image has to be a image URL') 
          expect(response.body.errors.errors[3]).to.have.property('msg').to.equal('Image is required') 
          done(err);
        });
    });

    it('Post successfully', (done) => {
      sandbox.stub(Member, 'create').resolves(itemMember);
      request(app)
        .post('/members')
        .send(itemMember)
        .expect(200)
        .end((err, response) => {
          expect(response.body)
            .to.equal('Member created successfully.');
          done(err);
        });
    });

    it('Post error, error message', (done) => {
      sandbox.stub(Member, 'create').throws();
      request(app)
        .post('/members')
        .send(itemMember)
        .expect(400)
        .end((err, response) => {
           expect(response.error.message);
          done(err);
        });
    });
  });

  context('PUT /members', () => {    
    it('Put successfully', (done) => {
      sandbox.stub(Member, 'update').resolves([1]);
        request(app)
          .put('/members/1')
          .send(itemMember)
        .expect(200).end((err, response) => {
          expect(response.body)
          .to.equal('Member updated successfully')
        done(err);
      });
    });    
    it('Put error, member not found.', (done) => {
        sandbox.stub(Member, 'update').resolves([0]);
        request(app)
        .put('/members/1')
        .send(itemMember)
        .expect(200).end((err, response) => {
          expect(response.body)
          .to.equal('Member not found.')
          done(err);
        });
    });    
       
  });

  context('DELETE /members', () => {    
    it('Delete successfully', (done) => {
      sandbox.stub(Member, 'destroy').resolves(1);
      request(app)
      .delete('/members/1')
      .expect(200).end((err, response) => {
       expect(response.body.msg)          
       .to.equal('Member deleted successfully')
       done(err);
      });
    });

    it('Delete error, member could not find', (done) => {
      sandbox.stub(Member, 'destroy').resolves(0);
      request(app)
      .delete('/members/1')
      .expect(404).end((err, response) => {
        expect(response.body.msg)          
        .to.equal('Could not find member')
        done(err);
      });
    });    
  });  

  context('GET /members', () => {    
    it('Get all successfully', (done) => {
      sandbox.stub(Member, 'findAll').resolves(getAllMembers);
      request(app)
        .get('/members')
        .expect(200).end((err, response) => {
          expect(response.body)
          .to.deep.equal(getAllMembers)
         done(err);
      });
    });    
    
    it('Get all error, while searching members in db', (done) => {
      sandbox.stub(Member, 'findAll').throws();
      request(app)
        .get('/members')
        .expect(500).end((err, response) => {
          expect(response.body.msg)
          .to.equal('error while searching members in db')
         done(err);
      });
    });    

    it('Get successfully', (done) => {
      const getByIdMembers = [{
        name: 'Member',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png'},
      ];
      sandbox.stub(Member, 'findAll').resolves(getByIdMembers);
      request(app)
        .get('/members/1')
        .expect(200).end((err, response) => {
          expect(response.body)
          .to.deep.equal(getByIdMembers)
         done(err);
      });
    });  
      
    it('Get error, member could not find', (done) => {
        sandbox.stub(Member, 'findAll').resolves([]);
        request(app)
          .get('/members/1')
          .expect(404).end((err, response) => {
            expect(response.body.msg)
            .to.deep.equal('Could not find member')
           done(err);
        });
    });    
  });    

});

