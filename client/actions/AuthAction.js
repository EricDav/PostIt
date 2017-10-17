import axios from 'axios';
import jwt from 'jsonwebtoken';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_GOOGLE_FORM,
  SHOW_DASHBOARD_PAGE, ERROR, IS_LOADING } from './ActionTypes';

/* global localStorage, window, Materialize */

/**
 * @description action for user current user information in store
 * 
 * @param  {object} user current user object
 * 
 * @return {object} dispatch object
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * @description set form error value
 * 
 * @param  {array} error login in error
 * 
 * @return {object} dispatch object
 */
export function error(error) {
  return {
    type: ERROR,
    error
  };
}

/**
 * @description set form error value
 * 
 * @param  {array} isLoading status when an asycronoius call is in progress
 * 
 * @return {object} dispatch object
 */
export function Loading(isLoading) {
  return {
    type: IS_LOADING,
    isLoading
  };
}

/**
 * @description set view in the  dashboard page
 * 
 * @param  {number} showForm determines which form to show in the dashboard page
 * 
 * @return {object} dispatch object
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
 * @param  {boolean} googledata the user details gotten from the google api
 * 
 * @return {object} dispatch object
 */
export function setGoogleForm(googledata) {
  return {
    type: SET_GOOGLE_FORM,
    googledata
  };
}


/**
 * @description Request to the API to signin a user
 * 
 * @param  {object} userData the login details of the user
 * @param {boolean} clearError the status of the login error
 * 
 * @return {object} dispatch object
 */
export function userSigninRequest(userData, clearError = false) {
  return (dispatch) => {
    if (clearError) {
      dispatch(error({
        errorType: 'signin',
        errorMessage: ''
      }));
    } else {
      dispatch(Loading(true));
      return axios.post('/api/v1/user/signin', userData).then((res) => {
        dispatch(Loading(false));
        localStorage.setItem('jwtToken', res.data.Token);
        setAuthorizationToken(res.data.Token);
        Materialize.toast('Logged In Successfully', 1500, 'green');
        window.location = 'dashboard';
        dispatch(setCurrentUser(jwt.decode(res.data.Token)));
      })
        .catch(({ response }) => {
          dispatch(Loading(false));
          dispatch(error({
            errorType: 'signin',
            errorMessage: response.data.message
          }));
        });
    }
  };
}

/**
 * @description Request to the API to signin a user with google+
 * 
 * @param  {object} userData the details of the google user
 * 
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
        window.location = 'dashboard';
      }
    });
}

/**
 * @description Request to the API to register a user
 * 
 * @param  {object} userData the user deatils to be saved
 * 
 * @return {object} dispatch object
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
 * @description Request to the API to signout a user
 
 * @return {object} dispatch object
 */
export function logout() {
  return dispatch =>
    axios.put('/api/v1/user/signout').then(() => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setDashboardPage(0));
      dispatch(setCurrentUser({
        currentUser: {
          userName: '',
          fullName: ''
        }
      }));
      window.location = '/';
    })
      .catch(() => {
        Materialize.toast('Try again. An error occured!', 2000, 'purple');
      });
}
