import axios from 'axios';
import { SET_CURRENT_USER_GROUPS, SET_NEW_GROUP_MESSAGES } from './types';

const group = [];

export function setCurrentUserGroups(groups) {
  return {
    type: SET_CURRENT_USER_GROUPS,
    groups
  }
}

export function setNewGroupMessages(newGroupMessages) {
  return {
    type: SET_NEW_GROUP_MESSAGES,
    newGroupMessages
  }
}

export function getGroupsRequest() {
  return dispatch => {
    return axios.get('/api/groups').then(res => {
      const groups = res.data.groups;
      dispatch(setCurrentUserGroups(groups));
    });
  };
}

export function getNewGroupMessages() {
  return dispatch => {
    return axios.get('/api/newMessages').then(res => {
      const newGroupMessages = res.data;
      dispatch(setNewGroupMessages(newGroupMessages));
    });
  };
}

