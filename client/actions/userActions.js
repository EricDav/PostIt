import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_SHOW_UPDATE_USER_PAGE, SET_ERROR_MESSAGE,
  SET_RESET_PASSWORD_USER_PAGE } from './types';

/**
 * @param  {object} user
 * @description action for user current user information in store
 * @return {object} returns object
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * @param  {boolean} show
 * @description set weather to show update user form
 * @return {object} returns object
 */
export function setShowUpdateUserPage(show) {
  return {
    type: SET_SHOW_UPDATE_USER_PAGE,
    show
  };
}

/**
 * @param  {boolean} show
 * @description set weather to show reset password user page
 * @return {object} returns object
 */
export function setResetPasswordUserPage(show) {
  return {
    type: SET_RESET_PASSWORD_USER_PAGE,
    show
  };
}

/**
 * @param  {object} error
 * @description set error messages
 * @return {object} returns object
 */
export function errorMessage(error) {
  return {
    type: SET_ERROR_MESSAGE,
    error
  };
}

/**
 * @param  {boolean} show
 * @description sign out action creator
 * @return {object} returns object
 */
export function logout() {
  return dispatch =>
    axios.put('/api/v1/user/signout').then(() => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser({ currentUser: { username: '',
        fullname: ' ' } }));
    });
}

/**
 * @param  {object} userData
 * @description set weather to show reset password user page
 * @return {object} returns object
 */
export function userSigninRequest(userData) {
  return dispatch =>
    axios.post('/api/v1/user/signin', userData).then(res => {
      const token = res.data.Token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
}

/**
 * @param  {boolean} shouldShow
 * @description set weather to show update user page
 * @return {object} returns object
 */
export function showUpdateUserPage(shouldShow) {
  return dispatch =>
    dispatch(setShowUpdateUserPage(shouldShow));
}

/**
 * @param  {boolean} shouldShow
 * @description set weather to show reset password user page
 * @return {object} returns object
 */
export function showResetPasswordUserPage(shouldShow) {
  return dispatch =>
    dispatch(setResetPasswordUserPage(shouldShow));
}

/**
 * @param  {object} userData
 * @description reset user password
 * @return {object} returns object
 */
export function resetPassword(userData) {
  return dispatch => {
    axios.put('/api/v1/resetPassword', userData).then(() => {
      dispatch(setResetPasswordUserPage(false));
    });
  }
}

/**
 * @param  {object} userData
 * @description update user information action creator
 * @return {object} returns object
 */
export function updateUserProfile(userData) {
  return dispatch => {
    axios.put('/api/v1/user/update', userData).then(() => {
      dispatch(setShowUpdateUserPage(false));
    });
  };
}

/**
 * @description set a user Information when updated
 * @return {object} returns object
 */
export function getUser() {
  return dispatch => {
    axios.get('/api/v1/user').then((res) => {
      const user = {
        currentUser: res.data.user
      };
      dispatch(setCurrentUser(user));
    });
  };
}
