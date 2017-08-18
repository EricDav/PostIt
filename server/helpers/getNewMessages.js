const newMessages = (groupId, messages, seenLasts) => {
  let numGroupMessages = 0;
  let numGroupSeenLast = 0;
  const numNewMessage = {};
  messages.forEach((message) => {
    if (message.groupId === groupId) {
      numGroupMessages +=1;
    }
  });
  seenLasts.forEach((seenLast) => {
    if (seenLast.groupId === groupId) {
      numGroupSeenLast = seenLast.seenLast;
    }
  });
  numNewMessage.groupId = groupId;
  numNewMessage.newMessage = numGroupMessages - numGroupSeenLast;
  return numNewMessage;
};

export default newMessages;
