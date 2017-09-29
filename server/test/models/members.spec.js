import chai from 'chai';
import expect from 'expect';
import dataBase from '../../models';

const should = chai.should();
const UserGroup = dataBase.UserGroup;


describe('<Unit Test>', () => {
  before((done) => {
    UserGroup.create({
      userId: 40,
      groupId: 60
    });
    done();
  });
  describe('Model UserGroup:', () => {
    describe('Method saveUser', () => {
      it('should be able to save group member details', (done) => {
        UserGroup.findOne({
          where: {
            groupId: 60
          }
        })
          .then((userGroup) => {
            expect(userGroup.groupId).toEqual(60);
            expect(userGroup.userId).toEqual(40);
          });
        done();
      });
      it('should be able to create a member successfully', (done) => {
        UserGroup.create({
          userId: 70,
          groupId: 60
        })
          .then((member) => {
            expect(member.groupId).toEqual(60);
            expect(member.userId).toEqual(70);
          });
        done();
      });
      it('should be able to get all users in group 60', (done) => {
        UserGroup.findAll({
          where: {
            groupId: 60
          }
        })
          .then((members) => {
            expect(members.length).toEqual(2);
            expect(members[0].groupId).toEqual(60);
            expect(members[0].userId).toEqual(40);
            expect(members[1].groupId).toEqual(60);
            expect(members[1].userId).toEqual(70);
          });
        done();
      });
    });
  });
});
