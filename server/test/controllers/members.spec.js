import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';

import dataBase from '../../models';
import app from './../../../app';

const UserGroup = dataBase.UserGroup;
const server = supertest.agent(app);
let regUserData = 'bearer ';

describe('UserGroup Routes', () => {
  before((done) => {
    server
      .post('/api/v1/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'Python',
        password: 'David19632'
      })
      .end((err, res) => {
        regUserData += res.body.Token;
        done();
      });
  });
  it(`should allows a logged in user adds member
  to a group he/she belongs to`, (done) => {
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
          UserGroup.findOne({
            where: {
              userId: 1
            }
          })
            .then((userGroup) => {
              userGroup.userId.should.equal(1);
            });
          res.status.should.equal(201);
          done();
        });
    });

  it(`should allows a logged in user to
  view all the members of a group he/she belongs to`, (done) => {
      server
        .get('/api/v1/groups/2/members')
        .set('Connection', 'keep alive')
        .set('authorization', regUserData)
        .set('Content-Type', 'application/json')
        .type('form')
        .expect(200)
        .end((err, res) => {
          res.body[0].userName.should.equal('python');
          res.status.should.equal(200);
          done();
        });
    });
});
