/**
 * @description get ids of all the messages
 * 
 * @param  {array} messages list of groups
 * @return {array} list of messages ids
 */

const getMessageIds = (messages) => {
  const messageIds = [];
  messages.forEach((message) => {
    messageIds.push(message.message.id);
  });
  return messageIds;
};

export default getMessageIds;
