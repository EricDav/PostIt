import axios from 'axios';
import { SET_CURRENT_GROUP_MESSAGES, SET_CURRENT_GROUP_MEMBERS,
  SET_LAST_SEEN_MESSAGE, SET_OLD_SEEN_LAST } from './types';

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

export function setOldSeenLast(setOldSeenLast) {
  return {
    type: SET_OLD_SEEN_LAST,
    setOldSeenLast
  }
}

export function setSeenLast(groupMessageSeenLast) {
  return {
    type: SET_LAST_SEEN_MESSAGE,
    groupMessageSeenLast
  }
}

export function getGroupMembers(groupId) {
  return dispatch => {
    return axios.get(`/api/v1/group/${groupId}/members`).then(res => {
      const members = res.data;
      dispatch(setCurrentGroupMembers(members));
    });
  };
}

export function getGroupMessages(groupId) {
  return dispatch => {
    return axios.get(`/api/v1/group/${groupId}/message/viewers`).then(res => {
      const messages = res.data;
      dispatch(setCurrentGroupMessages(messages.data));
      dispatch(setSeenLast(messages.seenLast));
    });
  };
}

export function updateSeenMessages(groupId, data) {
  return dispatch => {
    return axios.put(`/api/v1/group/${groupId}/updateSeenMessages`, data).then(res => {
      dispatch(setSeenLast(data.seenLast));
    });
  };
}
