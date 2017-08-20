import axios from 'axios';

export default function addUserToAGroup(userId, groupId) {
  return dispatch => {
    return axios.post(`/api/group/${groupId}/user`, userId).then(res => {
    });
  };
}
