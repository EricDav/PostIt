import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from '../../app';
import models from '../models';
import { user, loginUser, invalidUser, incorrectPassword, invalidEmail } from '../seeders/userSeeders';

const server = supertest.agent(app);


before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('User Registration', () => {
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
        res.body.user.should.equal('lolade');
        done();
      });
  });
});
