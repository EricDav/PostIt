import axios from 'axios';

import { ADD_MESSAGE, SET_NEW_MESSAGES, SET_LAST_SEEN_MESSAGE,
  SET_INITIAL_NEW_MESSAGES, SET_CURRENT_GROUP_MESSAGES,
  SET_PIORITY_LEVEL } from './ActionTypes';

/* global Materialize */

/**
 * @description add a message to the current messages
 * 
 * @param  {object} message the created message
 * 
 * @return {object} dispatch object
 */
export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message
  };
}

/**
 * @description actions that set the new group messages
 * 
 * @param  {array} newMessages the new messages in all groups
 * 
 * @return {object} dispatch object
 */
export function setNumberOfNewMessages(newGroupMessages) {
  return {
    type: SET_NEW_MESSAGES,
    newGroupMessages
  };
}

/**
 * @description set the current message seen last
 * 
 * @param  {integer} groupMessageSeenLast the message seen last
 * 
 * @return {object} dispatch object
 */
export function setSeenLast(groupMessageSeenLast) {
  return {
    type: SET_LAST_SEEN_MESSAGE,
    groupMessageSeenLast
  };
}

/**
 * @description set messages of the current group
 * 
 * @param  {array} messages group messages
 * 
 * @return {object} dispatch object
 */
export function setCurrentGroupMessages(messages) {
  return {
    type: SET_CURRENT_GROUP_MESSAGES,
    messages
  };
}

/**
 * @description set messages in store before viewing them
 * 
 * @param  {array} initialNewMessages the initial new messages
 * 
 * @return {object} dispatch object
 */
export function setInitialNewMessages(initialNewMessages) {
  return {
    type: SET_INITIAL_NEW_MESSAGES,
    initialNewMessages
  };
}

/**
 * @description saction creator for setting current group
 * 
 * @param  {array} piority
 * 
 * @return {object} dispatch object
 */
export function setPiority(piority) {
  return {
    type: SET_PIORITY_LEVEL,
    piority
  };
}

/**
 * @description set message piority
 * 
 * @param  {array} piority the piority level
 * 
 * @return {object} dispatch object
 */
export function piorityLevel(piority) {
  return (dispatch) => {
    dispatch(setPiority(piority));
  };
}
/**
 * @description make a post request that creates a message
 * 
 * @param  {object} messageData the messsage data
 * @param  {integer} groupId the id of the message to be created
 * 
 * @return {object} dispatch object
 */
export function createMessage(messageData, groupId) {
  return dispatch =>
    axios.post(`/api/v1/groups/${groupId}/message`, messageData).then((res) => {
      const message = {};
      message.message = res.data.message;
      message.viewers = [];
      dispatch(addMessage(message));
    })
      .catch(() => {
        Materialize.toast('An error occured!', 1500, 'purple');
      });
}

/**
 * @description get all the messages and
 * its viewers in a group by making a get request
 * 
 * @param  {integer} groupId the id of the group to be created
 * 
 * @return {object} returns object
 */
export function getGroupMessages(groupId) {
  return dispatch =>
    axios.get(`/api/v1/groups/${groupId}/message/viewers`).then((res) => {
      const messages = res.data;
      dispatch(setCurrentGroupMessages(messages.data));
      dispatch(setSeenLast(messages.seenLast));
    });
}

/**
 * @description update all the messages that have been seen by a user
 * 
 * @param  {integer} groupId the id of the group
 * @param  {integer} data group data to be updated in data base
 * 
 * @return {object} returns object
 */
export function updateSeenMessages(groupId, data) {
  return dispatch =>
    axios.put(`/api/v1/groups/${groupId}/updateSeenMessages`, data).then(() => {
      dispatch(setSeenLast(data.seenLast));
    });
}

/**
 * @description get new group messages
 * 
 * @return {object} dispatch object
 */
export function getNumberOfNewMessages() {
  return dispatch =>
    axios.get('/api/v1/newMessages').then((res) => {
      const numNewMessages = res.data;
      dispatch(setNumberOfNewMessages(numNewMessages));
    })
      .catch(() => {
        Materialize.toast('An error occured!', 1500, 'purple');
      });
}

/**
 * @description fetch all the initial new messages
 * 
 * @param  {array} initialNewMessages the initial new messages
 * 
 * @return {object} dispatch object
 */
export function getInitialNewMessages(initialNewMessages) {
  return dispatch =>
    dispatch(setInitialNewMessages(initialNewMessages));
}
