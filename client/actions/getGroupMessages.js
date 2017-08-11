import axios from 'axios';

import { SET_CURRENT_GROUP_MESSAGES } from './types';

export function setCurrentGroupMessages(messages) {
  return {
    type: SET_CURRENT_GROUP_MESSAGES,
    messages
  };
}

export function getGroupMessages(groupId) {
  return dispatch => {
    return axios.get(`/api/group/${groupId}/messages`).then(res => {
      const messages = res.data;
      dispatch(setCurrentGroupMessages(messages));
    });
  };
}
