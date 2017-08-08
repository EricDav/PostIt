import axios from 'axios';

export default function createGroupRequest(userData) {
  return dispatch => {
    return axios.post('/api/group', userData).then(res => {

    });
  };
}
