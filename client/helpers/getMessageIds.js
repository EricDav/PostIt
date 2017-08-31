const getMessageIds = (messages) => {
  const messageIds = [];
  messages.forEach((message) => {
    messageIds.push(message.message.id);
  });
  return messageIds;
};

export default getMessageIds;
