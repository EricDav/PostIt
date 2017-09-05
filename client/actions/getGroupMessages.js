import axios from 'axios';

import { SET_CURRENT_GROUP_MESSAGES, SET_CURRENT_GROUP_MEMBERS,
  SET_LAST_SEEN_MESSAGE, SET_OLD_SEEN_LAST } from './types';

/* global Materialize*/

/**
 * @description set messages of the current group
 * 
 * @param  {array} messages
 * @return {object} returns object
 */
export function setCurrentGroupMessages(messages) {
  return {
    type: SET_CURRENT_GROUP_MESSAGES,
    messages
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
 * @description set the initial seenLast value 
 * 
 * @param  {integer} setoldSeenLast
 * @return {object} returns object
 */
export function setOldSeenLast(setoldSeenLast) {
  return {
    type: SET_OLD_SEEN_LAST,
    setoldSeenLast
  };
}

/**
 * @description set the current message seen last
 * 
 * @param  {integer} groupMessageSeenLast
 * @return {object} returns object
 */
export function setSeenLast(groupMessageSeenLast) {
  return {
    type: SET_LAST_SEEN_MESSAGE,
    groupMessageSeenLast
  };
}

/**
 * @description get all the members in a group by making a get request
 * 
 * @param  {integer} groupId
 * @return {object} returns object
 */
export function getGroupMembers(groupId) {
  return dispatch =>
    axios.get(`/api/v1/group/${groupId}/members`).then((res) => {
      const members = res.data;
      dispatch(setCurrentGroupMembers(members));
    })
      .catch(() => {
        Materialize.toast('An error occured while loading members!', 2000, 'purple');
      });
}

/**
 * @description get all the messages and its viewers in a group by making a get request
 * 
 * @param  {integer} groupId
 * @return {object} returns object
 */
export function getGroupMessages(groupId) {
  return dispatch =>
    axios.get(`/api/v1/group/${groupId}/message/viewers`).then((res) => {
      const messages = res.data;
      dispatch(setCurrentGroupMessages(messages.data));
      dispatch(setSeenLast(messages.seenLast));
    });
}

/**
 * @description update all the messages that have been seen by a user
 * 
 * @param  {integer} groupId
 * @param  {integer} data group data to be updated in data base
 * @return {object} returns object
 */
export function updateSeenMessages(groupId, data) {
  return dispatch =>
    axios.put(`/api/v1/group/${groupId}/updateSeenMessages`, data).then(() => {
      dispatch(setSeenLast(data.seenLast));
    });
}
