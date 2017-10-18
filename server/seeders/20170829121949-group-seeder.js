module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Groups', [{
      externalName: 'Mathematics World',
      name: 'Mathematics World',
      description: 'This is where Maths lives',
      creator: 'pythagoras',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      externalName: 'Learn Python',
      name: 'Learn Python',
      description: 'Meet Python gurus',
      creator: 'python',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      externalName: 'Java World',
      name: 'Java World',
      description: 'We are android developers',
      creator: 'pythagoras1',
      createdAt: new Date(),
      updatedAt: new Date() }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
