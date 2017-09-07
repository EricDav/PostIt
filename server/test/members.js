import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../../app';

const server = supertest.agent(app);
let regUserData = 'bearer ';

describe('Group Routes', () => {
  it('should allows a registered user to login successfully', (done) => {
    server
      .post('/api/v1/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'Python',
        password: 'David19632'
      })
      .expect(200)
      .end((err, res) => {
        regUserData += res.body.Token;
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        done();
      });
  });
});


describe('Group Routes', () => {
  it('should allows a logged in user adds member to a group he/she belongs', (done) => {
    server
      .post('/api/v1/groups/2/user')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userId: 1
      })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        //res.body.memberId.should.equal(3);
        done();
      });
  });

  it('should allows a logged in user adds member to a group he/she belongs', (done) => {
    server
      .post('/api/v1/groups/2/user')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userId: 3
      })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        res.body.user.username.should.equal('Pythagoras1');
        done();
      });
  });

  it('should allows a logged in user to view all the members of a group he/she belongs to', (done) => {
    server
      .get('/api/v1/groups/2/members')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.body[0].username.should.equal('Python');
        res.status.should.equal(200);
        done();
      });
  });
});
