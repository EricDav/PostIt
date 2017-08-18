import axios from 'axios';
import { SET_CURRENT_GROUP_MESSAGES, SET_CURRENT_GROUP_MEMBERS,
  SET_LAST_SEEN_MESSAGE } from './types';

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

export function setSeenLast(groupMessageSeenLast) {
  return {
    type: SET_LAST_SEEN_MESSAGE,
    groupMessageSeenLast
  }
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
    return axios.get(`/api/group/${groupId}/message/viewers`).then(res => {
      const messages = res.data;
      dispatch(setCurrentGroupMessages(messages.data));
      dispatch(setSeenLast(messages.seenLast));
    });
  };
}

export function updateSeenMessages(groupId, data) {
  return dispatch => {
    return axios.put(`/api/group/${groupId}/updateSeenMessages`, data).then(res => {
      dispatch(setSeenLast(data.seenLast));
    });
  };
}
