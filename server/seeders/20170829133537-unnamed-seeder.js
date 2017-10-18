module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Messages', [{
      senderId: 1,
      content: 'I love mathematics',
      groupId: 1,
      senderUsername: 'pythagoras',
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: 'normal'
    }, {
      senderId: 2,
      content: 'I love Python',
      groupId: 2,
      senderUsername: 'python',
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: 'urgent'
    }, {
      senderId: 3,
      content: 'I love English',
      groupId: 3,
      senderUsername: 'pythagoras1',
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: 'critical'
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
