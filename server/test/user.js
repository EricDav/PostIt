import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import jwt from 'jsonwebtoken';

import app from '../../app';
import dataBase from '../models';

const User = dataBase.User;

const server = supertest.agent(app);
let regUserData = 'bearer ';

describe('User Registration', () => {
  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Amin123',
        password: 'david1996',
        email: 'david5789@gmail.com',
        fullName: 'Alienyi Daniel',
        phoneNumber: '08069400000',
      })
      .expect(201)
      .end((err, res) => {
        const user = jwt.decode(res.body.Token);
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        user.currentUser.userName.should.equal('Amin123');
        done();
      });
  });
  it('allows a new user to register with Google+', (done) => {
    server
      .post('/api/v1/user/googleSignin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        email: 'NewGooglUser@gmail.com',
      })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        res.body.message.should.equal('New user');
        done();
      });
  });
  it('allows a new user to signin with Google+', (done) => {
    server
      .post('/api/v1/user/googleSignin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        email: 'david5789@gmail.com',
      })
      .expect(201)
      .end((err, res) => {
        const user = jwt.decode(res.body.token);
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        user.currentUser.email.should.equal('david5789@gmail.com');
        res.body.message.should.equal('signin with google successfully');
        done();
      });
  });
  it('allows a new user to register', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Foul1234',
        password: 'david1996',
        email: 'david56789@gmail.com',
        fullName: 'Feyi Daniel',
        phoneNumber: '08069480086',
      })
      .expect(201)
      .end((err, res) => {
        const user = jwt.decode(res.body.Token);
        res.status.should.equal(201);
        user.currentUser.phoneNumber.should.equal('08069480086');
        res.body.success.should.equal(true);
        done();
      });
  });

  it('should throw error for invalid username', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: '89867',
        password: 'david1996',
        email: 'david59@gmail.com',
        fullName: 'Alienyi Daniel',
        phoneNumber: '08063087586',
      })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.userName.should
          .equal(`Invalid username. username must
      contain an alphabet and must not begin with a number`);
        done();
      });
  });

  it('should throw error if the email has been used by another user', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Path',
        password: 'david1996',
        email: 'david56789@gmail.com',
        fullName: 'Feyi Daniel',
        phoneNumber: '08060080086',
      })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.success.should.equal(false);
        done();
      });
  });
  it('should throw error if the email is invalid', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Path',
        password: 'david1996',
        email: 'david56789',
        fullName: 'Feyi Daniel',
        phoneNumber: '08060080086',
      })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.success.should.equal(false);
        res.body.error.email.should.equal('Invalid email address');
        done();
      });
  });

  it('disallows a new user to register if password is not up to eight characters', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Foul',
        password: 'david19',
        email: 'david5@gmail.com',
        fullName: 'Feyi Daniel',
        phoneNumber: '07069480086',
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.success.should.equal(false);
        done();
      });
  });
  it('disallows a new user to register if password does not contains at least a digit', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Foul123',
        password: 'davidythhhjjj',
        email: 'david5@gmail.com',
        fullName: 'Feyi Daniel',
        phoneNumber: '08069480011',
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.success.should.equal(false);
        done();
      });
  });

  it('should disallows a new user to register with an Invalid username', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: '89',
        password: 'david76j',
        email: 'davod5@gmail.com',
        fullName: 'Feyi Daniel',
        phoneNumber: '08060080011',
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.userName.should.equal(`Invalid username. username must
      contain an alphabet and must not begin with a number`);
        done();
      });
  });
  it('disallows a new user to register without a username', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        password: 'david1996',
        email: 'david5@gmail.com',
        fullName: 'Feyi Daniel',
        phoneNumber: '08069480086',
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.userName.should.equal('This field is required');
        res.body.success.should.equal(false);
        done();
      });
  });
  it('disallows a new user to register without a fullname', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Kayo',
        password: 'david1996',
        email: 'david57@gmail.com',
        phoneNumber: '09069480086',
      })
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.fullName.should.equal('This field is required');
        done();
      });
  });
});

describe('Authentication', () => {
  it('should prevents a user invalid username from logging in', (done) => {
    server
      .post('/api/v1/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'usydhfghwdh',
        password: 'david1996'
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Authentication failed. wrong username or password.');
        done();
      });
  });

  it('should prevents a user with a wrong password from logging in', (done) => {
    server
      .post('/api/v1/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Pythagoras',
        password: '6456346gf'
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.message.should.equal('Authentication failed. wrong username or password.');
        done();
      });
  });

  it('should allow a user with correct credentials to login', (done) => {
    server
      .post('/api/v1/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Amin123',
        password: 'david1996'
      })
      .expect(200)
      .end((err, res) => {
        regUserData += res.body.Token;
        res.status.should.equal(200);
        res.body.message.should.equal('User sign in successfully');
        done();
      });
  });
  it('should allows a login user to logout successfully', (done) => {
    server
      .put('/api/v1/user/signout')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', regUserData)
      .type('form')
      .expect(200)
      .end((err, res) => {
        User.findOne({
          where: {
            userName: 'Amin123'
          }
        }).then((user) => {
          user.active.should.equal(false);
        });
        res.status.should.equal(200);
        res.body.message.should.equal('logout successfully');
        done();
      });
  });
});

describe('Update user details', () => {
  it('should update user fullname', (done) => {
    server
      .put('/api/v1/user/update')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        fullName: 'Akinde Odunayo',
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('User info has been updated');
        done();
      });
  });
  it('should throw error if fullname contains numbers', (done) => {
    server
      .put('/api/v1/user/update')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        fullName: 'Ak3456',
      })
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.fullName.should.equal(`Name should contain alphabet and space 
      alone and should contain at least 5 characters`);
        done();
      });
  });
  it('should throw error if fullname has less than five characters', (done) => {
    server
      .put('/api/v1/user/update')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        fullName: 'Ak',
      })
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.fullName.should.equal(`Name should contain alphabet and space 
      alone and should contain at least 5 characters`);
        done();
      });
  });

  it('should update user email address', (done) => {
    server
      .put('/api/v1/user/update')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        email: 'updateEmail@me.com',
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('User info has been updated');
        done();
      });
  });
  it('should throw error if email address is invalid', (done) => {
    server
      .put('/api/v1/user/update')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        email: 'updateEmail.com',
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.email.should.equal('Invalid email');
        done();
      });
  });

  it('should update user phone number', (done) => {
    server
      .put('/api/v1/user/update')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        phoneNumber: '09022233344'
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('User info has been updated');
        done();
      });
  });
  it('should throw error if phone number is not eleven digit', (done) => {
    server
      .put('/api/v1/user/update')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        phoneNumber: '0902223'
      })
      .expect(401)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.phoneNumber.should.equal('Invalid phone number');
        done();
      });
  });
  it('should reset user password', (done) => {
    server
      .put('/api/v1/resetpassword')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', regUserData)
      .type('form')
      .send({
        oldPassword: 'david1996',
        newPassword: 'david1963'
      })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Password has been reset');
        done();
      });
  });
  it('should throw error if old password is incorrect', (done) => {
    server
      .put('/api/v1/resetpassword')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', regUserData)
      .type('form')
      .send({
        oldPassword: 'davhffhfgh96',
        newPassword: 'david1963'
      })
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Invalid old password');
        done();
      });
  });
  it('should throw error if new password is not up to eight characters', (done) => {
    server
      .put('/api/v1/resetpassword')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', regUserData)
      .type('form')
      .send({
        oldPassword: 'david1963',
        newPassword: '1963'
      })
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Password should contain at least 8 characters');
        done();
      });
  });
  it('should throw error if old password is incorrect', (done) => {
    server
      .put('/api/v1/resetpassword')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', regUserData)
      .type('form')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Invalid old password');
        done();
      });
  });
  it('should throw error if wrong user email request for forgot password', (done) => {
    server
      .post('/api/v1/sendSecretCode')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('authorization', regUserData)
      .type('form')
      .send({
        name: 'English',
        description: 'Where we studey English'
      })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('User does not exist');
        done();
      });
  });
  describe('All Users', () => {
    it('should all users', (done) => {
      server
        .get('/api/v1/allUsers')
        .set('Connection', 'keep alive')
        .set('authorization', regUserData)
        .set('Content-Type', 'application/json')
        .type('form')
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.length.should.equal(6);
          res.body[0].email.should.equal('python@gmail.com');
          res.body[1].userName.should.equal('Bola');
          res.body[3].fullName.should.equal('Alienyi David');
          done();
        });
    });
  });
});
