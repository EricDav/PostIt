import axios from 'axios';

import { ADD_MESSAGE } from './types';

/**
 * @description set messages of the current group
 * 
 * @param  {object} message
 * @return {object} returns object
 */
export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message
  };
}

/**
 * @description make a post request that creates a message
 * 
 * @param  {object} messageData
 * @param  {integer} groupId
 * @return {object} returns object
 */
export default function createMessage(messageData, groupId) {
  return dispatch => {
    return axios.post(`/api/v1/group/${groupId}/message`, messageData).then(res => {
      const message = {};
      message.message = res.data.message;
      message.viewers = [];
      dispatch(addMessage(message));
    });
  };
}
