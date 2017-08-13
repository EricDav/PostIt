import axios from 'axios';

export default function createMessage(messageData, groupId) {
  return dispatch => {
    return axios.post(`/api/group/${groupId}/message`, messageData).then(res => {
    });
  };
}
