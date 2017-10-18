const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync('David19632', salt);

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      userName: 'pythagoras',
      password: hashedPassword,
      email: 'david@gmail.com',
      fullName: 'Alienyi David',
      phoneNumber: '08099487586',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userName: 'python',
      password: hashedPassword,
      email: 'david5@gmail.com',
      fullName: 'Alienyi David',
      phoneNumber: '08099487506',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userName: 'pythagoras1',
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
