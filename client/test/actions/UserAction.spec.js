import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as UserAction from '../../actions/UserAction';
import { SET_SEARCHED_USERS, SET_CURRENT_USER,
  SET_RESET_PASSWORD_USER_PAGE, ADD_USER, SET_CURRENT_PAGE,
} from '../../actions/ActionTypes';
import localstorageMock from './mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = localstorageMock;

describe('User action', () => {
  it('should creates ADD_USER  when user adds another user to a group', () => {
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
  it(`should creates SET_SEARCHED_USERS when
  a user search for other users`, () => {
      const expectedActions = {
        type: SET_SEARCHED_USERS,
        searchedUsers: [] };
      expect(UserAction.setSearchedUser([])).toEqual(expectedActions);
    });
  it('should creates SET_CURRENT_PAGE', () => {
    const expectedActions = {
      type: SET_CURRENT_PAGE,
      pageNumber: 2 };
    expect(UserAction.setCurrentPage(2)).toEqual(expectedActions);
  });
  it('should creates SET_CURRENT_USER', () => {
    const expectedActions = {
      type: SET_CURRENT_USER,
      user: {
        fullName: 'mark',
        email: 'sad@me.com'
      } };
    const user = {
      fullName: 'mark',
      email: 'sad@me.com'
    };
    expect(UserAction.setCurrentUser(user)).toEqual(expectedActions);
  });
  it('should creates ET_RESET_PASSWORD_USER_PAGE', () => {
    const expectedActions = {
      type: SET_RESET_PASSWORD_USER_PAGE,
      show: 2 };
    expect(UserAction.setResetPasswordUserPage(2)).toEqual(expectedActions);
  });
});
