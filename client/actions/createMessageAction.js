import axios from 'axios';

export default function createMessage(messageData, groupId) {
  return dispatch => {
    return axios.post(`/api/v1/group/${groupId}/message`, messageData).then(res => {
    });
  };
}
