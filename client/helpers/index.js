/**
 * @description remove a particular group from a list of groups
 * 
 * @param  {array} groups list of groups
 * @param  {number} groupId id of the group to be deleted
 * 
 * @return {array} new list of groups excluding the deleted one
 */

export const deleteGroup = (groups, groupId) => {
  const newGroups = [];
  groups.forEach((group) => {
    if (Number(group.id) !== Number(groupId)) {
      newGroups.push(group);
    }
  });
  return newGroups;
};

/**
 * @description get ids of all the messages
 * 
 * @param  {array} messages list of groups
 * 
 * @return {array} list of messages ids
 */

export const getMessageIds = (messages) => {
  const messageIds = [];
  messages.forEach((message) => {
    messageIds.push(message.message.id);
  });
  return messageIds;
};

/**
 * @description 
 * 
 * @param  {string} searchStr id of the group to be deleted
 * @param  {array} users list of users
 * @param  {array} currentUser the current login user
 * @return {array} list of users that matches the searchStr
 */

export const search = (searchStr, users, currentUser) => {
  if (searchStr === '' || searchStr === ' ') {
    return [];
  }
  const matchUsers = [];
  users.forEach((user) => {
    const matchValue = new RegExp(searchStr.toLowerCase());
    if (matchValue.test(user.fullName.toLowerCase())
    && currentUser !== user.userName) {
      matchUsers.push(user);
    }
  });
  return matchUsers;
};

/**
 *@description checks if a field is null, undefined or empty
 * 
 * @param  {type} fieldData
 * @return {boolean} true or false
 */
export const isInValidField = (fieldData) => {
  if (typeof (fieldData) !== 'string' || fieldData.length === 0) {
    return true;
  }
  let hasValue = false;
  fieldData.split().forEach((value) => {
    if (value !== ' ') {
      hasValue = true;
    }
  });
  if (!hasValue) {
    return true;
  }
  return false;
};

/**
 * @description get the username from a list of users
 * 
 * @param  {array} listOfUsers list of users
 * @return {array} list of usernames
 */

export const getUsernames = (listOfUsers) => {
  const usernames = [];
  listOfUsers.forEach((user) => {
    usernames.push(user.userName);
  });
  return usernames;
};

/**
 * @description get the number of new messages for a particular group
 * 
 * @param  {array} groups list of newMessages
 * @param  {number} groupId id of the group 
 * @return {array} new list of groups excluding the deleted one
 */

export const getNewMessage = (groupId, numNewMessages) => {
  let numberOfNewMessages = 0;
  numNewMessages.forEach((numNewMessage) => {
    if (numNewMessage.groupId === groupId) {
      numberOfNewMessages = numNewMessage.newMessage;
    }
  });
  return numberOfNewMessages;
};

/**
 * @description get message viewers
 * 
 * @param  {array} messages list of Messages
 * @param  {number} groupId  
 * @return {array} list of message viewers
 */

export const getMessageViewers = (messages, groupId) => {
  messages.forEach((message) => {
    if (message.message.groupId === groupId) {
      return message.viewers;
    }
  });
};

/**
 * @description get message viewers
 * 
 * @param  {array} groups
 * @param  {object} updatedGroup list of Messages
 * @return {array} list of message viewers
 */
export const updateGroup = (groups, updatedGroup) => {
  const updatedGroups = [];
  groups.forEach((group) => {
    if (group.id === updatedGroup.id) {
      updatedGroups.push(updatedGroup);
    } else {
      updatedGroups.push(group);
    }
  });
  return updatedGroups;
};

/**
 * @description checks if the string pass in is a digit. 
 * Means all the charcters are digit
 * 
 * @param  {string} str
 * @return {boolean} true or false
 */

export const isDigit = (str) => {
  const num = str.toString();
  if (num.length === 0) {
    return false;
  }
  for (let i = 0; i < num.length; i += 1) {
    if (/[0-9]/.test(num[i]) === false) {
      return false;
    }
  }
  return true;
};
