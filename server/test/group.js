import supertest from 'supertest';
import 'mocha';
import 'chai';
import should from 'should';
import app from './../../app';

const server = supertest.agent(app);
let regUserData = 'bearer ';

describe('Group Routes', () => {
  it('should allows a registered user to signup successfully', (done) => {
    server
      .post('/api/v1/user/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        fullname: 'Ade Bola',
        username: 'Bola',
        email: 'Bola@me.com',
        phoneNumber: '09066780653',
        password: 'david1996'
      })
      .expect(200)
      .end((err, res) => {
        //regUserData += res.body.Token;
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
      .send({
        username: 'Pythagoras',
        password: 'David19632'
      })
      .expect(201)
      .end((err, res) => {
        regUserData += res.body.Token;
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        done();
      });
  });

  it('allows a logged in user to create a new group', (done) => {
    server
      .post('/api/v1/group')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        name: 'Cohort 8',
        description: 'We are one'
      })
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
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        name: 'House',
        description: 'I am house renter'
      })
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
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        name: 'Learn Python',
        description: 'Where we learn pyhton'
      })
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.name.should.equal('Group title already exist');
        done();
      });
  });

  it('allows a logged in user to get all the groups he/she belongs to', (done) => {
    server
      .get('/api/v1/groups')
      .set('authorization', regUserData)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.groups.length.should.equal(3);
        res.body.groups[0].description.should.equal('This is where Maths lives');
        res.body.groups[1].name.should.equal('Cohort 8');
        done();
      });
  });

  it('disallows a user to create a new group without a token', (done) => {
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

  it('disallows a user to create a new group with a wrong token', (done) => {
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


  it('allows a group admin to delete the group he owns', (done) => {
    server
      .delete('/api/v1/group/4/delete')
      .set('authorization', regUserData)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('group deleted successfully');
        done();
      });
  });

  it('prevents a user from deleting a group that does not exist', (done) => {
    server
      .delete('/api/v1/group/8/delete')
      .expect(404)
      .set('authorization', regUserData)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.message.should.equal('Group not found. Group does not exist or has been deleted');
        done();
      });
  });
  it('should update group details', (done) => {
    server
      .put('/api/v1/group/1/update')
      .set('Connection', 'keep alive')
      .set('authorization', regUserData)
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        name: 'love',
        description: 'Love is good'
      })
      .expect(201)
      .end((err, res) => {
        console.log(res.body)
        res.status.should.equal(201);
        res.body.message.should.equal('group info updated successfully');
        done();
      });
  });
});

