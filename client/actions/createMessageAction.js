import axios from 'axios';

/**
 * @param  {object} messageData
 * @param  {integer} groupId
 * @description make a post request that creates a message
 * @return {object} returns object
 */
export default function createMessage(messageData, groupId) {
  return dispatch => {
    return axios.post(`/api/v1/group/${groupId}/message`, messageData).then(res => {
    });
  };
}
