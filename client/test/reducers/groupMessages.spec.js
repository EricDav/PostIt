import expect from 'expect';
import * as MessageAction from '../../actions/MessageAction';
import groupMessages from '../../reducers/groupMessages';

describe('groupMessage Reducer', () => {
  it('should set the currrent group messages', () => {
    const initialState = [];
    const messages = [{
      id: 1,
      content: 'I love mathematics',
      groupId: 1,
      senderId: 1,
      senderUsername: 'Pythagoras'
    }, {
      id: 2,
      content: 'I love coding',
      groupId: 1,
      senderId: 1,
      senderUsername: 'Pythagoras'
    }];
    const action = MessageAction.setCurrentGroupMessages(messages);
    const newState = groupMessages(initialState, action);
    expect(newState[0].id).toEqual(1);
    expect(newState[0].senderUsername).toEqual('Pythagoras');
    expect(newState[1].id).toEqual(2);
    expect(newState[1].content).toEqual('I love coding');
    expect(newState.length).toEqual(2);
  });
  it('should update the currrent group of the user ', () => {
    const initialState = [{
      id: 1,
      content: 'I love mathematics',
      groupId: 1,
      senderId: 1,
      senderUsername: 'Pythagoras'
    }, {
      id: 2,
      content: 'I love coding',
      groupId: 1,
      senderId: 1,
      senderUsername: 'Pythagoras'
    }];
    const newMessage = {
      id: 3,
      content: "I don't joke with food",
      groupId: 2,
      senderId: 2,
      senderUsername: 'Python'
    };
    const action = MessageAction.addMessage(newMessage);
    const newState = groupMessages(initialState, action);
    expect(newState.length).toEqual(3);
    expect(newState[2].senderUsername).toEqual('Python');
    expect(newState[2].content).toEqual("I don't joke with food");
    expect(newState[2].senderId).toEqual(2);
    expect(newState[2].groupId).toEqual(2);
  });
  it('should return initial state for invalid type', () => {
    const initialState = [];
    const newMessage = {
      id: 3,
      content: "I don't joke with food",
      groupId: 2,
      senderId: 2,
      senderUsername: 'Python'
    };
    const action = {
      type: 'WRONG',
      newMessage
    };
    const newState = groupMessages(initialState, action);
    expect(newState.length).toEqual(0);
  });
});
