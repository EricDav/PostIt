import axios from 'axios';

/**
 * @description make a post request that add user feedback about the application
 * 
 * @param  {object} response user feedback
 * @return {object} returns object
 */
export default function feedback(response) {
  return axios.post('/api/v1/feedback', response);
}
