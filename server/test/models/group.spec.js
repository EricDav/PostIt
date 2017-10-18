import chai from 'chai';
import expect from 'expect';

import dataBase from '../../models';

const should = chai.should();
const Group = dataBase.Group;


describe('<Unit Test>', () => {
  before((done) => {
    Group.create({
      externalName: 'gang',
      creator: 'pythagoras',
      name: 'gang',
      description: 'This a group for crazy guys'
    });
    done();
  });
  describe('Group Model:', () => {
    it('should be able to save group details', (done) => {
      Group.findOne({
        where: {
          name: 'gang'
        }
      })
        .then((group) => {
          expect(group.description).toEqual('This a group for crazy guys');
          expect(group.name).toEqual('gang');
        });
      done();
    });
    it('should be able to create a group', (done) => {
      Group.create({
        externalName: 'dance all',
        creator: 'python',
        name: 'dance All',
        description: 'We dance for the whole Africa'
      })
        .then((group) => {
          expect(group.description).toEqual('We dance for the whole Africa');
          expect(group.name).toEqual('dance All');
        });
      done();
    });
    it('should throw error if group name is not unique', (done) => {
      Group.create({
        externalName: 'Dance All',
        creator: 'python',
        name: 'Dance All',
        description: 'We dance for the whole Africa hurrah!!'
      })
        .catch((error) => {
          expect(error.errors[0].message)
            .toEqual('Group name already exists. Use another name');
        });
      done();
    });
  });
});
