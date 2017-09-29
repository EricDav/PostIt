import chai from 'chai';
import expect from 'expect';
import dataBase from '../../models';

const bcrypt = require('bcryptjs');

const should = chai.should();
const Group = dataBase.Group;


describe('<Unit Test>', () => {
  before((done) => {
    Group.create({
      creator: 'Pythagoras',
      name: 'Gang',
      description: 'This a group for crazy guys'
    });
    done();
  });
  describe('Model User:', () => {
    describe('Method saveUser', () => {
      it('should be able to save user details', (done) => {
        Group.findOne({
          where: {
            name: 'Gang'
          }
        })
          .then((group) => {
            expect(group.description).toEqual('This a group for crazy guys');
            expect(group.name).toEqual('Gang');
          });
        done();
      });
      it('should be able to create a group', (done) => {
        Group.create({
          creator: 'Python',
          name: 'Dance All',
          description: 'We dance for the whole Africa'
        })
          .then((group) => {
            expect(group.description).toEqual('We dance for the whole Africa');
            expect(group.name).toEqual('Dance All');
          });
        done();
      });
      it('should throw error if group name is not unique', (done) => {
        Group.create({
          creator: 'Python',
          name: 'Dance All',
          description: 'We dance for the whole Africa hurrah!!'
        })
          .catch((error) => {
            expect(error.errors[0].message).toEqual('Group name already exists. Use another name');
          });
        done();
      });
    });
  });
});
