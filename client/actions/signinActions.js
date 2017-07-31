import axios from 'axios';

export default function userSigninRequest(userData) {
  return dispatch => {
    return axios.post('/api/user/signin', userData).then(res => {
      const token = res.data.Token;
      localStorage.setItem('jwtToken', token);
    });
  };
}
