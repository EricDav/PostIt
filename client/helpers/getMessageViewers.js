/**
 * @description get message viewers
 * 
 * @param  {array} messages list of Messages
 * @param  {number} groupId  
 * @return {array} list of message viewers
 */

const getMessageViewers = (messages, groupId) => {
  messages.forEach((message) => {
    if (message.message.groupId === groupId) {
      return message.viewers;
    }
  });
};

export default getMessageViewers;
