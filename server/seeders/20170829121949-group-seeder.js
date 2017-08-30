module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Groups', [{
      name: 'Mathematics World',
      description: 'This is where Maths lives',
      creator: 'Pythagoras',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Learn Python',
      description: 'Meet Python gurus',
      creator: 'Python',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Java World',
      description: 'We are android developers',
      creator: 'Pythagoras1',
      createdAt: new Date(),
      updatedAt: new Date() }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
