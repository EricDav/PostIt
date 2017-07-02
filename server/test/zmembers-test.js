import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../../app';
import { loginUser } from './../seeders/userSeeders';
import { members, invalidIds } from '../seeders/groupMembersSeeders';

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
  it('allows a logged in user adds member to a group he/she belongs', (done) => {
    server
      .post('/api/group/2/user')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(members[0])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.memberId.should.equal(1);
        done();
      });
  });

  it('allows a logged in user adds member to a group he/she belongs', (done) => {
    server
      .post('/api/group/2/user')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(members[3])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.memberId.should.equal(4);
        done();
      });
  });

  it('allows a logged in user adds member to a group he/she belongs', (done) => {
    server
      .post('/api/group/4/user')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send(members[1])
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.memberId.should.equal(2);
        done();
      });
  });

  it('allows a logged in user to view all the members of a group he/she belongs to', (done) => {
    server
      .get('/api/group/2/members')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });

  it('allows a logged in user to view all the members he/she can add to a group', (done) => {
    server
      .get('/api/group/2/nonMembers')
      .set('Connection', 'keep alive')
      .set('x-access-token', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .expect(201)
      .end((err, res) => {
        res.status.should.equal(201);
        done();
      });
  });

//   it('disallows a logged in user to view all the members of a group he/she does not belongs to', (done) => {
//     server
//       .get('/api/group/2/members')
//       .set('Connection', 'keep alive')
//       .set('x-access-token', regUserData)
//       .set('Content-Type', 'application/json')
//       .type('form')
//       .expect(401)
//       .end((err, res) => {
//         res.status.should.equal(401);
//         res.body.message.should.equal('You are not a member of this group, so you can not view group data');
//         done();
//       });
//   });

//   it('disallows a user to create a new group with a wrong token', (done) => {
//     server
//       .post('/api/group')
//       .set('Connection', 'keep alive')
//       .set('x-access-token', 'tyrtyfgf67543')
//       .set('Content-Type', 'application/json')
//       .type('form')
//       .send(groupDetails[0])
//       .expect(403)
//       .end((err, res) => {
//         res.status.should.equal(403);
//         res.body.message.should.equal('Failed to authenticate token.');
//         done();
//       });
//   });


//   it('allows a group admin to delete the group he owns', (done) => {
//     server
//       .delete('/api/group/1/delete')
//       .set('x-access-token', regUserData)
//       .expect(200)
//       .end((err, res) => {
//         res.status.should.equal(200);
//         res.body.message.should.equal('Deleted group, group messages and group members successfully');
//         done();
//       });
//   });

//   it('allows another registered user to login successfully', (done) => {
//     server
//       .post('/api/user/signin')
//       .set('Connection', 'keep alive')
//       .set('Content-Type', 'application/json')
//       .type('form')
//       .send(loginUser[1])
//       .set('x-access-token', regUserData)
//       .expect(200)
//       .end((err, res) => {
//         regUserData = res.body.Token;
//         res.status.should.equal(200);
//         res.body.success.should.equal(true);
//         done();
//       });
//   });

//   it('prevents a user from deleting a group that does not exist', (done) => {
//     server
//       .delete('/api/group/8/delete')
//       .expect(404)
//       .set('x-access-token', regUserData)
//       .end((err, res) => {
//         res.status.should.equal(404);
//         res.body.message.should.equal('Group not found. Group does not exist or has been deleted');
//         done();
//       });
//   });
});
