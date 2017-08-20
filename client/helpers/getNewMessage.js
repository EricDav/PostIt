const newMessage = (groupId, numNewMessages) => {
  let numberOfNewMessages = 0;
  numNewMessages.forEach((numNewMessage) => {
    if (numNewMessage.groupId === groupId) {
      numberOfNewMessages = numNewMessage.newMessage;
    }
  });
  return numberOfNewMessages;
};
export default newMessage;
