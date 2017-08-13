import axios from 'axios';
import { SET_CURRENT_GROUP_MESSAGES, SET_CURRENT_GROUP_MEMBERS } from './types';

export function setCurrentGroupMessages(messages) {
  return {
    type: SET_CURRENT_GROUP_MESSAGES,
    messages
  };
}

export function setCurrentGroupMembers(members) {
  return {
    type: SET_CURRENT_GROUP_MEMBERS,
    members
  };
}

export function getGroupMembers(groupId) {
  return dispatch => {
    return axios.get(`/api/group/${groupId}/members`).then(res => {
      const members = res.data;
      dispatch(setCurrentGroupMembers(members));
    });
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
