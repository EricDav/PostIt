const getMessageViewers = (messages, groupId) => {
  messages.forEach((message) => {
    if (message.message.groupId === groupId) {
      return message.viewers;
    }
  });
};

export default getMessageViewers;
