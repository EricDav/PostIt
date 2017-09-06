import axios from 'axios';

import { ADD_USER } from './types';

/* global Materialize */

/**
 * @description update state to 
 * 
 * @param  {object} user
 * @return {object} returns object
 */
export function addUser(user) {
  return {
    type: ADD_USER,
    user
  };
}
/**
 * @description make a post request that add a user to a group
 * 
 * @param  {integer} userId
 * @param  {integer} groupId
 * @return {object} returns object
 */
export default function addUserToAGroup(userId, groupId) {
  return dispatch =>
    axios.post(`/api/v1/groups/${groupId}/user`, userId).then((res) => {
      dispatch(addUser(res.data.user));
    })
      .catch(() => {
        Materialize.toast('An error occured!', 1500, 'purple');
      });
}
