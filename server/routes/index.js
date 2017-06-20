const userController = require('../controllers/user');
const groupController = require('../controllers/grup');
const groupMembersController = require('../controllers/groupMember');
const groupPostsController = require('../controllers/grouPost');

module.exports = (app) => {
  app.post('/api/group', groupController.create);
  app.post('/api/user/signup', userController.create);
  app.post('/api/group/:groupId/user', groupMembersController.create);
  app.post('/api/group/:groupId/message', groupPostsController.create);
};

