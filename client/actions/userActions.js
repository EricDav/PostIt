import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_SHOW_UPDATE_USER_PAGE, SET_ERROR_MESSAGE } from './types';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
export function setShowUpdateUserPage(show) {
  return {
    type: SET_SHOW_UPDATE_USER_PAGE,
    show
  };
}
export function errorMessage(error) {
  return {
    type: SET_ERROR_MESSAGE,
    error
  };
}

export function logout() {
  return dispatch => {
    return axios.put('/api/user/signout').then(res => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser({ currentUser: { username: '',
        fullname: ' ' } }));
    });
  };
}


export function userSigninRequest(userData) {
  return dispatch => {
    return axios.post('/api/user/signin', userData).then(res => {
      const token = res.data.Token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  };
}

export function showUpdateUserPage(shouldShow) {
  return dispatch => {
    dispatch(setShowUpdateUserPage(shouldShow));
  }
}

export function updateUserProfile(userData) {
  return dispatch => {
    return axios.put('/api/user/update', userData).then(res => {
      dispatch(setShowUpdateUserPage(false));
    });
  };
}

export function getUser() {
  return dispatch => {
    return axios.get('/api/user').then(res => {
      const user = {
        currentUser: res.data.user
      };
      dispatch(setCurrentUser(user));
    });
  };
}
