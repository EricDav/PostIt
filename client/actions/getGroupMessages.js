import axios from 'axios';
import { SET_CURRENT_GROUP_MESSAGES, SET_CURRENT_GROUP_MEMBERS,
  SET_LAST_SEEN_MESSAGE, SET_OLD_SEEN_LAST } from './types';

/**
 * @param  {array} messages
 * @description set messages of the current group
 * @return {object} returns object
 */
export function setCurrentGroupMessages(messages) {
  return {
    type: SET_CURRENT_GROUP_MESSAGES,
    messages
  };
}

/**
 * @param  {array} members
 * @description set the members of the current group
 * @return {object} returns object
 */
export function setCurrentGroupMembers(members) {
  return {
    type: SET_CURRENT_GROUP_MEMBERS,
    members
  };
}

/**
 * @param  {integer} setOldSeenLast
 * @description set the initial seenLast value 
 * @return {object} returns object
 */
export function setOldSeenLast(setoldSeenLast) {
  return {
    type: SET_OLD_SEEN_LAST,
    setoldSeenLast
  };
}

/**
 * @param  {integer} groupMessageSeenLast
 * @description set the current message seen last
 * @return {object} returns object
 */
export function setSeenLast(groupMessageSeenLast) {
  return {
    type: SET_LAST_SEEN_MESSAGE,
    groupMessageSeenLast
  };
}

/**
 * @param  {integer} groupId
 * @description get all the members in a group by making a get request
 * @return {object} returns object
 */
export function getGroupMembers(groupId) {
  return dispatch => {
    return axios.get(`/api/v1/group/${groupId}/members`).then(res => {
      const members = res.data;
      dispatch(setCurrentGroupMembers(members));
    });
  };
}
/**
 * @param  {integer} groupId
 * @description get all the messages in a group by making a get request
 * @return {object} returns object
 */
export function getGroupMessages(groupId) {
  return dispatch => {
    return axios.get(`/api/v1/group/${groupId}/message/viewers`).then(res => {
      const messages = res.data;
      dispatch(setCurrentGroupMessages(messages.data));
      dispatch(setSeenLast(messages.seenLast));
    });
  };
}
/**
 * @param  {integer} groupId
 * @param  {integer} data group data to be updated in data base
 * @description get all the members in a group by making a get request
 * @return {object} returns object
 */
export function updateSeenMessages(groupId, data) {
  return dispatch => {
    return axios.put(`/api/v1/group/${groupId}/updateSeenMessages`, data).then(res => {
      dispatch(setSeenLast(data.seenLast));
    });
  };
}
