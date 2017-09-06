/**
 * @description get the number of new messages for a particular group
 * 
 * @param  {array} groups list of newMessages
 * @param  {number} groupId id of the group 
 * @return {array} new list of groups excluding the deleted one
 */

const getNewMessage = (groupId, numNewMessages) => {
  let numberOfNewMessages = 0;
  numNewMessages.forEach((numNewMessage) => {
    if (numNewMessage.groupId === groupId) {
      numberOfNewMessages = numNewMessage.newMessage;
    }
  });
  return numberOfNewMessages;
};
export default getNewMessage;
