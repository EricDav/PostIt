import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';

import dataBase from '../../models';
import app from './../../../app';

const server = supertest.agent(app);
const Group = dataBase.Group;
let regUserData = 'bearer ';

describe('Group Routes', () => {
  before((done) => {
    server
      .post('/api/v1/user/signin')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        userName: 'pythagoras',
        password: 'David19632'
      })
      .end((err, res) => {
        regUserData += res.body.Token;
        done();
      });
  });
  it('should allow a logged in user to create a new group', (done) => {
    server
      .post('/api/v1/group')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        externalName: 'cohort 8',
        name: 'cohort 8',
        description: 'We are the great cohort 28 man'
      })
      .expect(201)
      .end((err, res) => {
        Group.findOne({
          where: {
            name: 'cohort 8'
          }
        })
          .then((group) => {
            group.name.should.equal('cohort 8');
            group.description.should.equal('We are the great cohort 28 man');
          });
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('should allow a logged in user to create a new group', (done) => {
    server
      .post('/api/v1/group')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        externalName: 'House',
        name: 'House',
        description: 'This group is meant for those who are need of house'
      })
      .expect(201)
      .end((err, res) => {
        Group.findOne({
          where: {
            name: 'House'
          }
        })
          .then((group) => {
            group.name.should.equal('House');
            group.description.should
              .equal('This group is meant for those who are need of house');
          });
        res.status.should.equal(201);
        res.body.success.should.equal(true);
        done();
      });
  });
  it('should allows a logged in user to get all the groups he/she belongs to',
    (done) => {
      server
        .get('/api/v1/groups?offset=0&limit=10')
        .set('authorization', regUserData)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.groups.length.should.equal(3);
          res.body.groups[0].description.should
            .equal('This group is meant for those who are need of house');
          res.body.groups[1].name.should.equal('cohort 8');
          done();
        });
    });

  it('should disallows a user to create a new group without a token',
    (done) => {
      server
        .post('/api/v1/group')
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'fish',
          description: 'where we train fish'
        })
        .expect(403)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.message.should.equal('No token provided.');
          done();
        });
    });

  it('should disallows a user to create a new group with a wrong token',
    (done) => {
      server
        .post('/api/v1/group')
        .set('Connection', 'keep alive')
        .set('authorization', 'tyrtyfgf67543')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'love',
          description: 'Love is good'
        })
        .expect(403)
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.message.should.equal('Failed to authenticate token.');
          done();
        });
    });


  it('should allows a group owner to delete the group he owns', (done) => {
    server
      .delete('/api/v1/groups/4/delete')
      .set('authorization', regUserData)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('group deleted successfully');
        done();
      });
  });

  it(`should throw error when a user wants to
  delete a group that does not exist`,
    (done) => {
      server
        .delete('/api/v1/groups/8/delete')
        .expect(404)
        .set('authorization', regUserData)
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.message.should
            .equal('Group not found. Group does not exist or has been deleted');
          done();
        });
    });
  it('should update group details', (done) => {
    server
      .put('/api/v1/groups/1/update')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        name: 'love',
        description: 'Love is good because God is love'
      })
      .expect(200)
      .end((err, res) => {
        Group.findOne({
          where: {
            id: 1
          }
        })
          .then((group) => {
            group.name.should.equal('love');
            group.description.should.equal('Love is good because God is love');
          });
        res.status.should.equal(200);
        res.body.message.should.equal('group info updated successfully');
        done();
      });
  });
});

