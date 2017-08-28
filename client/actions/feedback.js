import axios from 'axios';

/**
 * @param  {object} response user feedback
 * @description make a post request that add a user to a group
 * @return {object} returns object
 */
export default function feedback(response) {
  return dispatch => {
    return axios.post(`/api/v1/feedback`, response).then(res => {
    });
  };
}
