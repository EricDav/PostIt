import axios from 'axios';

/**
 * @param  {integer} userId
 * @param  {integer} groupId
 * @description make a post request that add a user to a group
 * @return {object} returns object
 */
export default function addUserToAGroup(userId, groupId) {
  return dispatch => {
    return axios.post(`/api/v1/group/${groupId}/user`, userId).then(() => {
    });
  };
}
