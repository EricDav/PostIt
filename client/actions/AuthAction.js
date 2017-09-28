import axios from 'axios';
import jwt from 'jsonwebtoken';
import { browserHistory } from 'react-router';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_GOOGLE_FORM, SHOW_DASHBOARD_PAGE } from './ActionTypes';

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

/**
 * @description set view in the  dashboard page
 * 
 * @param  {number} showForm determines which form to show in the dashboard page
 * @return {object} returns object
 */
export function setDashboardPage(showForm) {
  return {
    type: SHOW_DASHBOARD_PAGE,
    showForm
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
 * @description create action for user signin
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export function userSignupRequest(userData) {
  return dispatch =>
    axios.post('/api/v1/user/signup', userData).then((res) => {
      const token = res.data.Token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
}

/**
 * @description sign out action creator
 * 
 * @param  {boolean} show
 * @return {object} returns object
 */
export function logout() {
  return dispatch =>
    axios.put('/api/v1/user/signout').then(() => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setDashboardPage(0));
      dispatch(setCurrentUser(
        {
          currentUser: {
            userName: '',
            fullName: ''
          }
        }));
      //browserHistory.push('/');
    })
      .catch(() => {
        Materialize.toast('Try again. An error occured!', 2000, 'purple');
      });
}
