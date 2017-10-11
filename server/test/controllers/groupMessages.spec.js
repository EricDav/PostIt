import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';

import dataBase from '../../models';
import app from './../../../app';

const Message = dataBase.Message;
const server = supertest.agent(app);
let regUserData = 'bearer ';

describe('Group Routes', () => {
  it('allows a registered user to login successfully', (done) => {
    server
      .post('/api/v1/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Pythagoras',
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
  it('allows a logged in user create post to a group he/she belongs', (done) => {
    server
      .post('/api/v1/groups/1/message')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        content: 'I love coding',
        priority: 'normal'
      })
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.content.should.equal('I love coding');
        done();
      });
  });

  it('allows a logged in user create post to a group he/she belongs', (done) => {
    server
      .post('/api/v1/groups/1/message')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        content: 'I am here',
        priority: 'normal'
      })
      .expect(201)
      .end((err, res) => {
        Message.findOne({
          where: {
            content: 'I am here'
          }
        })
          .then((message) => {
            message.priority.should.equal('normal');
            message.senderUsername.should.equal('Pythagoras');
            message.content.should.equal('I am here');
          });
        res.status.should.equal(201);
        res.body.message.senderUsername.should.equal('Pythagoras');
        done();
      });
  });
  it('allows a logged in user create post to a group he/she belongs', (done) => {
    server
      .post('/api/v1/groups/1/message')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        content: 'I am the winner',
        priority: 'normal'
      })
      .expect(201)
      .end((err, res) => {
        Message.findOne({
          where: {
            content: 'I am the winner'
          }
        })
          .then((message) => {
            message.priority.should.equal('normal');
            message.senderUsername.should.equal('Pythagoras');
            message.groupId.should.equal(1);
          });
        res.status.should.equal(201);
        res.body.message.content.should.equal('I am the winner');
        done();
      });
  });
  it('allows a logged in user get all posts from the group he/she belongs', (done) => {
    server
      .get('/api/v1/groups/1/messages')
      .set('authorization', regUserData)
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body[1].content.should.equal('I love coding');
        done();
      });
  });
  it(`allows a logged in user get all posts and their
    viewers from the group he/she belongs`,
    (done) => {
      server
        .get('/api/v1/groups/1/message/viewers')
        .set('authorization', regUserData)
        .expect(200)
        .end((err, res) => {
          res.body.data[0].message.content.should.equal('I love mathematics');
          res.body.data[1].message.id.should.equal(4);
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          done();
        });
    });
});