import expect from 'expect';
import * as MessageAction from '../../actions/MessageAction';
import newMessages from '../../reducers/newMessages';

describe('New messages Reducer', () => {
  it('should set the initial new messages', () => {
    const initialState = [];
    const numNewMessages = [{
      groupId: 1,
      newMessage: 2
    }, {
      groupId: 2,
      newMessage: 1
    }];
    const action = MessageAction.setNewGroupMessages(numNewMessages);
    const newState = newMessages(initialState, action);
    expect(newState[0].groupId).toEqual(1);
    expect(newState[0].newMessage).toEqual(2);
    expect(newState[1].groupId).toEqual(2);
    expect(newState[1].newMessage).toEqual(1);
    expect(newState.length).toEqual(2);
  });
  it('should return initial state for invalid type', () => {
    const initialState = [];
    const numNewMessages = [{
      groupId: 1,
      newMessage: 2
    }, {
      groupId: 2,
      newMessage: 1
    }];
    const action = {
      type: 'WRONG',
      numNewMessages
    }
    const newState = newMessages(initialState, action);
    expect(newState.length).toEqual(0);
  });
});
