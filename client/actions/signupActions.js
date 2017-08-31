import axios from 'axios';
import jwt from 'jsonwebtoken';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

/**
 * @description action for user signin
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
 * @description create action for user signin
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/v1/user/signup', userData).then((res) => {
      const token = res.data.Token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  };
}
