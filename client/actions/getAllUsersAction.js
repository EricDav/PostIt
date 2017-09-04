import axios from 'axios';

import { SET_ALL_USERS } from './types';

/* global Materialize */

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
  return dispatch =>
    axios.get('/api/v1/allUsers').then((res) => {
      dispatch(setAllUser(res.data));
    })
      .catch(() => {
        Materialize.toast('An error occured! could not leave group', 1500, 'purple');
      });
}
