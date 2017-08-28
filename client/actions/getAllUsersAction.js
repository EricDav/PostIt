import axios from 'axios';
import { SET_ALL_USERS } from './types';

/**
 * @param  {array} allUsers
 * @description set all users to state
 * @return {object} returns object
 */
export function setAllUser(allUsers) {
  return {
    type: SET_ALL_USERS,
    allUsers
  };
}

/**
 * @param  {array} allUsers
 * @description make a get request to fetch all users
 * @return {object} returns object
 */
export function getAllUsersRequest() {
  return dispatch => {
    return axios.get('/api/v1/allUsers').then(res => {
      const allUsers = res.data;
      dispatch(setAllUser(allUsers));
    });
  };
}
