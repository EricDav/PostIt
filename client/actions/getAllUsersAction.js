import axios from 'axios';

import { SET_ALL_USERS } from './types';

/**
 * @description set all users to state
 * 
 * @param  {array} allUsers
 * @return {object} returns object
 */
export function setAllUser(allUsers) {
  return {
    type: SET_ALL_USERS,
    allUsers
  };
}

/**
 * @description make a get request to fetch all users
 * 
 * @param  {array} allUsers
 * @return {object} returns object
 */
export function getAllUsersRequest() {
  return dispatch => {
    return axios.get('/api/v1/allUsers').then(res => {
      dispatch(setAllUser(res.data));
    });
  };
}
