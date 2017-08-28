import supertest from 'supertest';
import model from '../models';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../../app';
import { loginUser, user } from './../seeders/userSeeders';
import groupDetails from './../seeders/groupSeeders';

const server = supertest.agent(app);
let regUserData;

describe('Group Routes', () => {
  before((done) => {
    model.sequelize.sync({ force: true }).then(() => {
      done();
    }).catch((errors) => {
      done();
    });
  });
  it('should allows a registered user to signup successfully', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[0])
      .expect(200)
      .end((err, res) => {
        regUserData = res.body.Token;
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });
  it('allows a registered user to log in successfully', (done) => {
    server
      .post('/api/v1/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(loginUser[0])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('allows a logged in user to create a new group', (done) => {
    server
      .post('/api/v1/group')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(groupDetails[0])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('allows a logged in user to create a new group', (done) => {
    server
      .post('/api/v1/group')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(groupDetails[0])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('disallows a logged in user to create a group with an existing name', (done) => {
    server
      .post('/api/v1/group')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(groupDetails[1])
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.success.should.equal(false);
        done();
      });
  });

  it('allows a logged in user to get all the groups he/she belongs to', (done) => {
    server
      .get('/api/v1/user/1/groups')
      .set('x-access-token', regUserData)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });

  it('disallows a user to create a new group without a token', (done) => {
    server
      .post('/api/v1/group')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(groupDetails[0])
      .expect(403)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('No token provided.');
        done();
      });
  });

  it('disallows a user to create a new group with a wrong token', (done) => {
    server
      .post('/api/v1/group')
      .set('Connection', 'keep alive')
      .set('x-access-token', 'tyrtyfgf67543')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(groupDetails[0])
      .expect(403)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.message.should.equal('Failed to authenticate token.');
        done();
      });
  });


  it('allows a group admin to delete the group he owns', (done) => {
    server
      .delete('/api/v1/group/1/delete')
      .set('x-access-token', regUserData)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Deleted group, group messages and group members successfully');
        done();
      });
  });

  it('allows another registered user to login successfully', (done) => {
    server
      .post('/api/v1/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(loginUser[1])
      .set('x-access-token', regUserData)
      .expect(200)
      .end((err, res) => {
        regUserData = res.body.Token;
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        done();
      });
  });
  it('prevents a user from deleting a group that does not exist', (done) => {
    server
      .delete('/api/v1/group/8/delete')
      .expect(404)
      .set('x-access-token', regUserData)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Group not found. Group does not exist or has been deleted');
        done();
      });
  });
});

