import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as AuthAction from '../../actions/AuthAction';
import { SET_CURRENT_USER, IS_LOADING, ERROR,
  SET_GOOGLE_FORM, SHOW_DASHBOARD_PAGE }
  from '../../actions/ActionTypes';
import localstorageMock from './mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = localstorageMock;

describe('Auth actions', () => {
  it('should creates SET_GOOGLE FORM  when login with google+', () => {
    const response = {
      data: { message: 'New user'
      } };
    axios.post = jest.fn(() => Promise.resolve(response));
    const googledata = {
      fullName: 'Alienyi Daniel',
      email: 'alienyidavid@gmail.com',
      showForm: false };
    const expectedActions = [{ type: SET_GOOGLE_FORM, googledata }];
    const store = mockStore({ showGoogleForm: {} });

    return store.dispatch(AuthAction.googleSignin(googledata))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should creates SHOW_DASHBOARD_PAGE  when logout', () => {
    const response = {
      data: { message: 'logout successfully'
      } };
    axios.put = jest.fn(() => Promise.resolve(response));
    const showForm = 0;
    const expectedActions = [{ type: SHOW_DASHBOARD_PAGE, showForm },
      { type: SET_CURRENT_USER,
        user: { currentUser: {
          userName: '',
          fullName: ''
        } } }];
    const store = mockStore({ showGoogleForm: {} });

    return store.dispatch(AuthAction.logout())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe(' Login action', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should creates SET_CURRENT_USER, when a user logs in', () => {
    const response = {
      data: { Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VyTmFtZSI6IlB5dGhhZ29yYXMiLCJpZCI6MSwiZnVsbE5hbWUiOiJBbGllbnlpIERhdmlkIiwiZW1haWwiOiJhbGllbnlpZGF2aWQ0Y2hyaXN0QGdtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiMDkwNjYzNTQyMzQifSwiZXhwIjoxNTA2NDMxNjU2LCJpYXQiOjE1MDYzNDUyNTZ9.Bg5HR63zv0RfKUBAULkwQL3tOKTZkxKe-D_zt1_wbi0'
      } };
    axios.post = jest.fn(() => Promise.resolve(response));
    const user = { userName: 'Pythagoras',
      fullName: 'Alienyi David',
      phoneNumber: '09066354234',
      id: 1,
      email: 'alienyidavid4christ@gmail.com' };
    const expectedActions = [{ isLoading: true, type: 'IS_LOADING' },
      { isLoading: false, type: 'IS_LOADING' }, { type: SET_CURRENT_USER,
        user: { currentUser: user, exp: 1506431656, iat: 1506345256 } }];
    const store = mockStore({ user: {} });

    return store.dispatch(AuthAction.userSigninRequest(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should set the current user ', () => {
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
    expect(AuthAction.setCurrentUser(user)).toEqual(expectedActions);
  });
  it('should set error', () => {
    const expectedActions = {
      type: ERROR,
      error: {
        errorType: 'login',
        email: 'invalid password'
      } };
    const error = {
      errorType: 'login',
      email: 'invalid password'
    };
    expect(AuthAction.error(error)).toEqual(expectedActions);
  });
  it('should show that an api call is in progress', () => {
    const expectedActions = {
      type: IS_LOADING,
      isLoading: true };
    expect(AuthAction.Loading(true)).toEqual(expectedActions);
  });
  it('should set google data', () => {
    const expectedActions = {
      type: SET_GOOGLE_FORM,
      googledata: {
        fullName: 'mark',
        email: 'sad@me.com'
      } };
    const googledata = {
      fullName: 'mark',
      email: 'sad@me.com'
    };
    expect(AuthAction.setGoogleForm(googledata)).toEqual(expectedActions);
  });
  it('should set google form', () => {
    const expectedActions = {
      type: SHOW_DASHBOARD_PAGE,
      showForm: true };
    expect(AuthAction.setDashboardPage(true)).toEqual(expectedActions);
  });
});
