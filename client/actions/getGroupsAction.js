import axios from 'axios';

import { SET_CURRENT_USER_GROUPS, SET_NEW_GROUP_MESSAGES, SET_INITIAL_NEW_MESSAGES } from './types';

/**
 * @description set current groups a user belongs to
 * 
 * @param  {array} groups
 * @return {object} returns object
 */
export function setCurrentUserGroups(groups) {
  return {
    type: SET_CURRENT_USER_GROUPS,
    groups
  };
}

/**
 * @description actions that set the new group messages
 * 
 * @param  {array} newGroupMessages
 * @return {object} returns object
 */
export function setNewGroupMessages(newGroupMessages) {
  return {
    type: SET_NEW_GROUP_MESSAGES,
    newGroupMessages
  };
}

/**
 * @description set messages of the current group
 * 
 * @param  {array} messages
 * @return {object} returns object
 */
export function setInitialNewMessages(initialNewMessages) {
  return {
    type: SET_INITIAL_NEW_MESSAGES,
    initialNewMessages
  };
}

/**
 * @description fetch groups
 * 
 * @return {object} returns object
 */
export function getGroupsRequest() {
  return dispatch => {
    return axios.get('/api/v1/groups').then(res => {
      const groups = res.data.groups;
      dispatch(setCurrentUserGroups(groups));
    });
  };
}

/**
 * @description get new group messages
 * 
 * @return {object} returns object
 */
export function getNewGroupMessages() {
  return dispatch => {
    return axios.get('/api/v1/newMessages').then(res => {
      const newGroupMessages = res.data;
      dispatch(setNewGroupMessages(newGroupMessages));
    });
  };
}

/**
 * @description fetch all the initial new messages
 * 
 * @param  {array} initialNewMessages
 * @return {object} returns object
 */
export function getInitialNewMessages(initialNewMessages) {
  return dispatch => {
    dispatch(setInitialNewMessages(initialNewMessages));
  };
}
