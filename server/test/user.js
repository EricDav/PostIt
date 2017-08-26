import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from '../../app';
import models from '../models';
import { user, loginUser, invalidUser, incorrectPassword, invalidEmail } from '../seeders/userSeeders';

const server = supertest.agent(app);

describe('User Registration', () => {
  before((done) => {
    models.sequelize.sync({ force: true }).then(() => {
      done(null);
    }).catch((errors) => {
      done(errors);
    });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[0])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[1])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[2])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('allows a new user to register', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[3])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('should ensure that username is unique', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[1])
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('username already exist');
        done();
      });
  });

  it('validates email during registration', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidEmail)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Not a valid email address. can not find the extension .com ');
        done();
      });
  });

  it('disallows a new user to register if password is not up to eight characters', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[4])
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.success.should.equal(false);
        done();
      });
  });
  it('disallows a new user to register if password does not contains at least a digit', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[5])
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.success.should.equal(false);
        done();
      });
  });
  it('disallows a new user to register if password does not contain at least one alphabet', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[7])
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Weak password. Password should contain at least 8 characters including at least one number and alphabet');
        done();
      });
  });
  it('disallows a new user to register with an Invalid userName', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[6])
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.success.should.equal(false);
        done();
      });
  });
  it('disallows a new user to register without a username', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[8])
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.success.should.equal(false);
        done();
      });
  });
  it('disallows a new user to register without a name', (done) => {
    server
      .post('/api/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(user[9])
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.success.should.equal(false);
        done();
      });
  });
});

describe('Authentication', () => {
  it('prevents an invalid user from logging in', (done) => {
    server
      .post('/api/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidUser)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Authentication failed. wrong username or password.');
        done();
      });
  });

  it('prevents a user with a wrong password from logging in', (done) => {
    server
      .post('/api/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(incorrectPassword)
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Authentication failed. wrong username or password.');
        done();
      });
  });

  it('allows a registered user to login successfully', (done) => {
    server
      .post('/api/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(loginUser[0])
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('Token generated successfully');
        done();
      });
  });
});
