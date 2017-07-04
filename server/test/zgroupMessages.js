import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../../app';
import { loginUser } from './../seeders/userSeeders';
import messages from './../seeders/groupMessagesSeeders';

const server = supertest.agent(app);
let regUserData;

describe('Group Routes', () => {
  it('allows a registered user to login successfully', (done) => {
    server
      .post('/api/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(loginUser[0])
      .expect(200)
      .end((err, res) => {
        regUserData = res.body.Token;
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        done();
      });
  });
});


describe('Group Routes', () => {
  it('allows a logged in user create post to a group he/she belongs', (done) => {
    server
      .post('/api/group/2/message')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(messages[0])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Can you solve 2x + 5 = 6');
        done();
      });
  });

  it('allows a logged in user create post to a group he/she belongs', (done) => {
    server
      .post('/api/group/2/message')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(messages[1])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.postId.should.equal(2);
        done();
      });
  });
  it('allows a logged in user create post to a group he/she belongs', (done) => {
    server
      .post('/api/group/2/message')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(messages[2])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.postId.should.equal(2);
        done();
      });
  });
  it('allows a logged in user create post to a group he/she belongs', (done) => {
    server
      .post('/api/group/2/message')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(messages[3])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.postId.should.equal(2);
        done();
      });
  });
  it('allows a logged in user get all posts from the group he/she belongs', (done) => {
    server
      .get('/api/group/2/messages')
      .set('x-access-token', regUserData)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });
});
