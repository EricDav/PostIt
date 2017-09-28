import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MocalLocalStorage from 'mock-localstorage';
import axios from 'axios';

import * as UserAction from '../../actions/UserAction';
import { SET_SEARCHED_USERS, SET_CURRENT_USER, SET_RESET_PASSWORD_USER_PAGE,
  SET_SHOW_UPDATE_USER_PAGE, ADD_USER, RESET_PASSWORD_USER, SET_CURRENT_PAGE,
  WILL_SHOW } from '../../actions/ActionTypes';
import localstorageMock from './mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
//const mockStorage = new MocalLocalStorage();

window.localStorage = localstorageMock;

describe('User action', () => {
//   it('creates SET_SHOW_UPDATE_USER_PAGE  when a user update his/her profile', () => {
//     const response = {
//       data: { message: 'User info updated successfully',
//         success: true
//       } };
//     const user = {
//       fullName: 'Alienyi David',
//       email: 'alienyi@me.com'
//     };
//     axios.put = jest.fn(() => Promise.resolve(response));
//     const data = {
//       userId: 1,
//       groupId: 2
//     };
//     const expectedActions = [ user ];
//     // const store = mockStore({ showGoogleForm: {} });

//     return store.dispatch(UserAction.updateUserProfile(user))
//       .then(() => {
//         expect(store.getActions()).toEqual(expectedActions);
//       });
//   });
  it('creates ADD_USER  when user adds another user to a group', () => {
    const response = {
      data: { message: 'user added successfully',
        user: {
          fullName: 'Alienyi David',
          userName: 'Pythagoras',
          id: 1,
        }
      } };
    const user = {
      fullName: 'Alienyi David',
      userName: 'Pythagoras',
      id: 1,
    };
    axios.post = jest.fn(() => Promise.resolve(response));
    const data = {
      userId: 1,
      groupId: 2
    };
    const expectedActions = [{ type: ADD_USER, user }];
    const store = mockStore({ showGoogleForm: {} });

    return store.dispatch(UserAction.addUserToAGroup(data))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
