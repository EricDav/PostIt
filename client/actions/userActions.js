import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_SHOW_UPDATE_USER_PAGE, SET_ERROR_MESSAGE,
  SET_RESET_PASSWORD_USER_PAGE, SHOW_SIGNUP_FORM, SET_GOOGLE_FORM, SET_CURRENT_PAGE } from './types';

/* global localStorage, window, Materialize */

/**
 * @description action for user current user information in store
 * 
 * @param  {object} user
 * @return {object} returns object
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setCurrentPage(pageNumber) {
  return {
    type: SET_CURRENT_PAGE,
    pageNumber
  };
}

/**
 * @description this action decide whether to show sign up form alone
 * 
 * @param  {object} googleUserData
 * @return {object} returns object
 */
export function setShowSignupForm(googleUserData) {
  return {
    type: SHOW_SIGNUP_FORM,
    googleUserData
  };
}

/**
 * @description set weather to show update user form
 * 
 * @param  {boolean} show
 * @return {object} returns object
 */
export function setShowUpdateUserPage(show) {
  return {
    type: SET_SHOW_UPDATE_USER_PAGE,
    show
  };
}

/**
 * @description set weather to show update form
 * 
 * @param  {boolean} googledata
 * @return {object} returns object
 */
export function setGoogleForm(googledata) {
  return {
    type: SET_GOOGLE_FORM,
    googledata
  };
}

/**
 * @description set weather to show reset password user page
 * 
 * @param  {boolean} show
 * @return {object} returns object
 */
export function setResetPasswordUserPage(show) {
  return {
    type: SET_RESET_PASSWORD_USER_PAGE,
    show
  };
}

/**
 * @description set error messages
 * 
 * @param  {object} error
 * @return {object} returns object
 */
export function errorMessage(error) {
  return {
    type: SET_ERROR_MESSAGE,
    error
  };
}

/**
 * @description sign out action creator
 * 
 * @param  {boolean} show
 * @return {object} returns object
 */
export function logout() {
  browserHistory.push('/');
  return dispatch =>
    axios.put('/api/v1/user/signout').then(() => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser(
        {
          currentUser: {
            username: '',
            fullname: ''
          }
        }));
      browserHistory.push('/');
      //window.location.reload();
    })
      .catch(() => {
        Materialize.toast('Try again. An error occured!', 2000, 'purple');
      });
}

/**
 * @description sign a valid user in
 * 
 * @param  {object} userData like user password and username
 * @return {object} returns object
 */
export function userSigninRequest(userData) {
  return dispatch =>
    axios.post('/api/v1/user/signin', userData).then((res) => {
      const token = res.data.Token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
}

/**
 * @description sign user with google account in
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export function googleSignin(userData) {
  return dispatch =>
    axios.post('/api/v1/user/googleSignin', userData).then((res) => {
      const token = res.data.token;
      if (res.data.message === 'New user') {
        dispatch(setGoogleForm(userData));
      } else {
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        browserHistory.push('dashboard');
        window.location.reload();
      }
    });
}


/**
 * @description set weather to show update user page
 * 
 * @param  {boolean} shouldShow
 * @return {object} returns object
 */
export function showUpdateUserPage(shouldShow) {
  return dispatch =>
    dispatch(setShowUpdateUserPage(shouldShow));
}

/**
 * @description set weather to show reset password user page
 * 
 * @param  {boolean} shouldShow
 * @return {object} returns object
 */
export function showResetPasswordUserPage(shouldShow) {
  return dispatch =>
    dispatch(setResetPasswordUserPage(shouldShow));
}


/**
 * @description set weather to show only signup Form in the home page
 * 
 * @param  {boolean} googleUserData
 * @return {object} returns object
 */
export function showSignupForm(googleUserData) {
  return dispatch =>
    dispatch(setShowSignupForm(googleUserData));
}

/**
 * @description reset user password
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export function resetPassword(userData) {
  return dispatch =>
    axios.put('/api/v1/resetPassword', userData).then(() => {
      dispatch(setResetPasswordUserPage(false));
    });
}

/**
 *  @description update user information action creator
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export function updateUserProfile(userData) {
  return dispatch =>
    axios.put('/api/v1/user/update', userData).then(() => {
      dispatch(setShowUpdateUserPage(false));
    });
}

/**
 * @description set a user Information when updated
 * 
 * @param {object}user
 * @return {object} returns object
 */
export function setUpdatedUser(user) {
  return (dispatch) => {
    dispatch(setCurrentUser(user));
  };
}

export function setPage(pageNumber) {
  return (dispatch) => {
    dispatch(setCurrentPage(pageNumber));
  };
}
