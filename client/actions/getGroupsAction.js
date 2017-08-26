import axios from 'axios';
import { SET_CURRENT_USER_GROUPS, SET_NEW_GROUP_MESSAGES, SET_INITIAL_NEW_MESSAGES } from './types';

export function setCurrentUserGroups(groups) {
  return {
    type: SET_CURRENT_USER_GROUPS,
    groups
  };
}

export function setNewGroupMessages(newGroupMessages) {
  return {
    type: SET_NEW_GROUP_MESSAGES,
    newGroupMessages
  };
}

export function setInitialNewMessages(initialNewMessages) {
  return {
    type: SET_INITIAL_NEW_MESSAGES,
    initialNewMessages
  };
}

export function getGroupsRequest() {
  return dispatch => {
    return axios.get('/api/v1/groups').then(res => {
      const groups = res.data.groups;
      dispatch(setCurrentUserGroups(groups));
    });
  };
}

export function getNewGroupMessages() {
  return dispatch => {
    return axios.get('/api/v1/newMessages').then(res => {
      const newGroupMessages = res.data;
      dispatch(setNewGroupMessages(newGroupMessages));
    });
  };
}

export function getInitialNewMessages(initialNewMessages) {
  return dispatch => {
    dispatch(setInitialNewMessages(initialNewMessages));
  };
}

