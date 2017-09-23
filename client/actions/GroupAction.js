import axios from 'axios';

import { ADD_GROUP, SET_CURRENT_USER_GROUPS, DELETE_GROUP, UPDATE_GROUP_DATA,
  TEXT_CONTENT, UPDATE_CURRENT_GROUP, SET_CURRENT_GROUP_MEMBERS,
  SET_CURRENT_GROUP } from './ActionTypes';

/* global Materialize */

/**
 * @description make a post request that creates a group
 * 
 * @param  {object} addedGroup
 * @return {object} returns object
 */
export function addGroup(addedGroup) {
  return {
    type: ADD_GROUP,
    addedGroup
  };
}

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
 * @description set the members of the current group
 * 
 * @param  {array} members
 * @return {object} returns object
 */
export function setCurrentGroupMembers(members) {
  return {
    type: SET_CURRENT_GROUP_MEMBERS,
    members
  };
}

/**
 * @description update the current group
 * 
 * @param  {array} updateGroupData
 * @return {object} returns object
 */
export function updateGroupInCurrentUserGroups(updateGroupData) {
  return {
    type: UPDATE_CURRENT_GROUP,
    updateGroupData
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
 * @param  {object} group
 * @description current group action
 * @return {object} returns object
 */
export function setCurrentGroup(group) {
  return {
    type: SET_CURRENT_GROUP,
    group
  };
}

/**
 * @description saction creator for setting current group
 * 
 * @param  {object} group
 * @return {object} returns object
 */
export function setGroup(group) {
  return dispatch =>
    dispatch(setCurrentGroup(group));
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
        Materialize.toast(`An error occured! could not 
        leave group', 1500, 'purple`);
      });
}


/**
 * @description make a post request that creates a group
 * 
 * @param  {object} userData
 * @return {object} returns object
 */
export function createGroupRequest(userData) {
  return dispatch =>
    axios.post('/api/v1/group', userData).then((res) => {
      dispatch(addGroup(res.data.group));
    });
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
    })
      .catch((err) => {
        Materialize.toast('An error occured while craeting groups!',
          1500, 'purple');
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
 * @description get all the members in a group by making a get request
 * 
 * @param  {integer} groupId
 * @return {object} returns object
 */
export function getGroupMembers(groupId) {
  return dispatch =>
    axios.get(`/api/v1/groups/${groupId}/members`).then((res) => {
      const members = res.data;
      dispatch(setCurrentGroupMembers(members));
    })
      .catch(() => {
        Materialize.toast('An error occured while loading members!', 2000, 'purple');
      });
}
