import chai from 'chai';
import expect from 'expect';

import dataBase from '../../models';

const should = chai.should();
const Message = dataBase.Message;


describe('<Unit Test>', () => {
  before((done) => {
    Message.create({
      content: 'I love food so much',
      priority: 'normal',
      groupId: 4,
      senderId: 1,
      senderUsername: 'Python'
    });
    done();
  });
  describe('Model Message:', () => {
    it('should be able to save a message', (done) => {
      Message.findOne({
        where: {
          groupId: 4
        }
      })
        .then((message) => {
          expect(message.content).toEqual('I love food so much');
          expect(message.groupId).toEqual(4);
        });
      done();
    });
    it('should be able to create a message successfully', (done) => {
      Message.create({
        content: 'I am good guy stop molesting me',
        priority: 'urgent',
        groupId: 9,
        senderId: 3,
        senderUsername: 'Python'
      })
        .then((message) => {
          expect(message.content).toEqual('I am good guy stop molesting me');
          expect(message.groupId).toEqual(9);
          expect(message.senderId).toEqual(3);
          expect(message.priority).toEqual('urgent');
          expect(message.senderUsername).toEqual('Python');
        });
      done();
    });
  });
});
