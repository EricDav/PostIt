const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync('David19632', salt);

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      userName: 'Pythagoras',
      password: hashedPassword,
      email: 'david@gmail.com',
      fullName: 'Alienyi David',
      phoneNumber: '08099487586',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userName: 'Python',
      password: hashedPassword,
      email: 'david5@gmail.com',
      fullName: 'Alienyi David',
      phoneNumber: '08099487506',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userName: 'Pythagoras1',
      password: hashedPassword,
      email: 'python@gmail.com',
      fullName: 'Alienyi David',
      phoneNumber: '08090087586',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
