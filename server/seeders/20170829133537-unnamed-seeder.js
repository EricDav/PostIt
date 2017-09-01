module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Messages', [{
      senderId: 1,
      content: 'I love mathematics',
      groupId: 1,
      senderUsername: 'Pythagoras',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      senderId: 2,
      content: 'I love Python',
      groupId: 2,
      senderUsername: 'Python',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      senderId: 3,
      content: 'I love English',
      groupId: 3,
      senderUsername: 'Pythagoras1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
