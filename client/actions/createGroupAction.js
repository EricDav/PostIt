import axios from 'axios';

import { ADD_GROUP } from './types';

/**
 * @description make a post request that creates a group
 * 
 * @param  {object} addedGroup
 * @return {object} returns object
 */
export function addGroup(addedGroup) {
  return {
    type: ADD_GROUP,
    addedGroup
  };
}

/**
 * @description make a post request that creates a group
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export default function createGroupRequest(userData) {
  return dispatch => {
    return axios.post('/api/v1/group', userData).then((res) => {
      dispatch(addGroup(res.data.group));
    });
  };
}
