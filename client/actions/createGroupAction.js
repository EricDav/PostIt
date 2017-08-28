import axios from 'axios';

/**
 * @param  {object} userData
 * @description make a post request that creates a group
 * @return {object} returns object
 */
export default function createGroupRequest(userData) {
  return dispatch => {
    return axios.post('/api/v1/group', userData).then(res => {
    });
  };
}
