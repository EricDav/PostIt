import axios from 'axios';

/* global Materialize */

import { SET_CURRENT_USER_GROUPS, SET_NEW_GROUP_MESSAGES,
  SET_INITIAL_NEW_MESSAGES, DELETE_GROUP, UPDATE_GROUP_DATA, TEXT_CONTENT, UPDATE_CURRENT_GROUP } from './types';

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


export function setGroupTextContent(textContents) {
  return {
    type: TEXT_CONTENT,
    textContents
  };
}

/**
 * @description remove a spcify group from the state
 * 
 * @param  {object} groupData data of the specify group to be deleted
 * @return {object} returns object
 */
export function deleteGroup(groupData) {
  return {
    type: DELETE_GROUP,
    groupData
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
 * @description set messages in store before viewing them
 * 
 * @param  {array} initialNewMessages
 * @return {object} returns object
 */
export function setInitialNewMessages(initialNewMessages) {
  return {
    type: SET_INITIAL_NEW_MESSAGES,
    initialNewMessages
  };
}

/**
 * @description update the current group
 * 
 * @param  {array} updatedGroupData
 * @return {object} returns object
 */
export function updateGroup(updatedGroupData) {
  return {
    type: UPDATE_GROUP_DATA,
    updatedGroupData
  };
}

/**
 * @description update the current group
 * 
 * @param  {array} updatedGroupData
 * @return {object} returns object
 */
export function updateGroupInCurrentUserGroups(updateGroupData) {
  return {
    type: UPDATE_CURRENT_GROUP,
    updateGroupData
  };
}


/**
 * @description fetch groups
 * 
 * @return {object} returns object
 */
export function getGroupsRequest() {
  return dispatch =>
    axios.get('/api/v1/groups').then((res) => {
      const groups = res.data.groups;
      dispatch(setCurrentUserGroups(groups));
      const textGroups = [];
      let textObj = {};
      groups.forEach((group) => {
        textObj.groupId = group.id;
        textObj.textContent = '';
        textGroups.push(textObj);
        textObj = {};
      });
      dispatch(setGroupTextContent(textGroups));
    })
      .catch(() => {
        Materialize.toast('An error occured!', 1500, 'purple');
      });
}

/**
 * @description get new group messages
 * 
 * @return {object} returns object
 */
export function getNewGroupMessages() {
  return dispatch =>
    axios.get('/api/v1/newMessages').then((res) => {
      const newGroupMessages = res.data;
      dispatch(setNewGroupMessages(newGroupMessages));
    })
      .catch(() => {
        Materialize.toast('An error occured!', 1500, 'purple');
      });
}

/**
 * @description remove a user 
 * 
 * @param  {object} data details of the deleted user
 * @return {object} returns object
 */
export function deleteUserFromGroup(data) {
  return dispatch =>
    axios.delete(`/api/v1/groups/${data.groupId}/users/${data.userId}/delete`, data).then(() => {
      dispatch(deleteGroup(data));
    })
      .catch(() => {
        Materialize.toast('An error occured! could not leave group', 1500, 'purple');
      });
}

/**
 * @description delete a group
 * 
 * @param  {object} data details of the deleted group
 * @return {object} returns object
 */
export function deleteCurrentGroup(data) {
  return dispatch =>
    axios.delete(`/api/v1/groups/${data.groupId}/delete`).then(() => {
      dispatch(deleteGroup(data));
    })
      .catch(() => {
        Materialize.toast('An error occured! could not leave group', 1500, 'purple');
      });
}

/**
 * @description remove a user 
 * 
 * @param  {object} userData details of the deleted user
 * @param  {integer} groupId the group id of the group to be updated
 * @return {object} returns object
 */
export function updateCurrentGroup(userData, groupId) {
  return dispatch =>
    axios.put(`/api/v1/groups/${groupId}/update`, userData).then(() => {
      dispatch(updateGroup(userData));
      dispatch(updateGroupInCurrentUserGroups(userData));
    });
}

/**
 * @description fetch all the initial new messages
 * 
 * @param  {array} initialNewMessages
 * @return {object} returns object
 */
export function getInitialNewMessages(initialNewMessages) {
  return dispatch =>
    dispatch(setInitialNewMessages(initialNewMessages));
}
