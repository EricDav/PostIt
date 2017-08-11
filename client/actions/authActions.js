import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function logout() {
  return dispatch => {
    return axios.put('/api/user/signout').then(res => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser({ currentUser: { username: '',
        fullname: '' } }));
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
