import axios from 'axios';

/**
 * @description make a post request that add a user to a group
 * 
 * @param  {integer} userId
 * @param  {integer} groupId
 * @return {object} returns object
 */
export default function addUserToAGroup(userId, groupId) {
  return axios.post(`/api/v1/group/${groupId}/user`, userId);
}
