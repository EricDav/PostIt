const userController = require('../controllers/user');
const groupController = require('../controllers/grup');
const groupMembersController = require('../controllers/groupMember');

console.log(groupController.create);
console.log(userController.create);
console.log(groupMembersController.create);
module.exports = (app) => {
  app.post('/api/group', groupController.create);
  app.post('/api/user/signup', userController.create);
  app.post('/api/group/:groupId/user', groupMembersController.create);
};
