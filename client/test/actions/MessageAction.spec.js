import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as MessageAction from '../../actions/MessageAction';
import { ADD_MESSAGE, SET_LAST_SEEN_MESSAGE,
  SET_CURRENT_GROUP_MESSAGES, SET_PIORITY_LEVEL }
  from '../../actions/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Message action', () => {
  it('should creates ADD_MESSAGE  when a user create a message', () => {
    const response = {
      data: { message: {
        id: 1,
        content: 'I love mathematics',
        groupId: 1,
        senderId: 1,
        senderUsername: 'Pythagoras'
      }
      } };
    const message = {
      id: 1,
      content: 'I love mathematics',
      groupId: 1,
      senderId: 1,
      senderUsername: 'Pythagoras'
    };
    axios.post = jest.fn(() => Promise.resolve(response));
    const expectedActions = [{ type: ADD_MESSAGE,
      message: { message, viewers: [] } }];
    const store = mockStore({ messages: {} });

    return store.dispatch(MessageAction.createMessage(message))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should creates SET_LAST_SEEN_MESSAGE,  when a message is updated', () => {
    const data = {
      seenLast: 1
    };
    axios.put = jest.fn(() => Promise.resolve());
    const expectedActions =
    [{ type: SET_LAST_SEEN_MESSAGE, groupMessageSeenLast: 1 }];
    const store = mockStore({ messages: {} });

    return store.dispatch(MessageAction.updateSeenMessages(1, data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should creates SET_CURRENT_GROUP_MESSAGES', () => {
    const response = {
      data: { data: [{
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
      }],
      seenLast: 1
      },
      seenLast: 1 };
    axios.get = jest.fn(() => Promise.resolve(response));
    const expectedActions =
    [{ type: SET_CURRENT_GROUP_MESSAGES, messages: response.data.data },
      { groupMessageSeenLast: 1, type: 'SET_LAST_SEEN_MESSAGE' }];
    const store = mockStore({ messages: {} });

    return store.dispatch(MessageAction.getGroupMessages())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it(`should creates SET_PIORITY_LEVEL,  when 
  a message is posted with piority`, () => {
      const expectedActions = { type: SET_PIORITY_LEVEL,
        piority: 'normal' };
      expect(MessageAction.setPiority('normal')).toEqual(expectedActions);
    });
});
