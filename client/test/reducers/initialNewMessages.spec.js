import expect from 'expect';
import * as MessageAction from '../../actions/MessageAction';
import initialNewMessages from '../../reducers/initialNewMessages';

describe('InitialMessages Reducer', () => {
  it('should set the initial new messages', () => {
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
    const action = MessageAction.setInitialNewMessages(messages);
    const newState = initialNewMessages(initialState, action);
    expect(newState[0].id).toEqual(1);
    expect(newState[0].senderUsername).toEqual('Pythagoras');
    expect(newState[1].id).toEqual(2);
    expect(newState[1].content).toEqual('I love coding');
    expect(newState.length).toEqual(2);
  });
  it('should return initial state for invalid type', () => {
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
    const action = {
      type: 'WRONG',
      messages
    }
    const newState = initialNewMessages(initialState, action);
    expect(newState.length).toEqual(0);
  });
});
