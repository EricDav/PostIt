import chai from 'chai';
import expect from 'expect';

import dataBase from '../../models';

const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync('David19632', salt);

const should = chai.should();
const User = dataBase.User;


describe('<Unit Test>', () => {
  before((done) => {
    User.create({
      fullName: 'Alienyi David',
      userName: 'pythagoras3456',
      email: 'dav@me.com',
      phoneNumber: '09022344356',
      password: hashedPassword,
      active: true
    });
    done();
  });
  describe('User Model:', () => {
    it('should be able to save user details', (done) => {
      User.findOne({
        where: {
          email: 'dav@me.com'
        }
      })
        .then((user) => {
          expect(user.email).toEqual('dav@me.com');
        });
      done();
    });
    it('should throw error for invalid email', (done) => {
      User.create({
        fullName: 'Alienyi David',
        userName: 'Pythagoras3456',
        email: 'davme.com',
        phoneNumber: '09022344356',
        password: hashedPassword,
        active: true
      })
        .catch((err) => {
          err.errors[0].message.should.equal('Email address is invalid');
        });
      done();
    });
    it('should throw error if username is not unique', (done) => {
      User.create({
        fullName: 'Alienyi David',
        userName: 'Pythagoras3456',
        email: 'david12345@me.com',
        phoneNumber: '09020044356',
        password: hashedPassword,
        active: true
      })
        .catch((err) => {
          err.errors[0].message.should.equal('Username already exists');
        });
      done();
    });
    it('should throw error if phone number is not unique', (done) => {
      User.create({
        fullName: 'Alienyi David',
        userName: 'Pythagoras345',
        email: 'david123@me.com',
        phoneNumber: '09020044356',
        password: hashedPassword,
        active: true
      })
        .catch((err) => {
          err.errors[0].message.should.equal('Phone number already exists');
        });
      done();
    });
  });
});
