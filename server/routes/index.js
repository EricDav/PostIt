const userController = require('../controllers/user');
const groupController = require('../controllers/grup');
const groupMembersController = require('../controllers/groupMember');
const groupPostsController = require('../controllers/grouPost');
const loginController = require('../controllers/login');
const auth = require('../middlewares/auth');
const groupMessagesController = require('../controllers/groupMessages');

module.exports = (app) => {
  app.get('/api/group/:groupId/messages', groupMessagesController.getPosts);
  app.get('/api/allUsers', userController.allUsers);
  app.post('/api/group', auth, groupController.create);
  app.post('/api/user/signup', userController.create);
  app.post('/api/group/:groupId/user', groupMembersController.create);
  app.post('/api/group/:postId/message', groupPostsController.create);
  app.post('/api/user/signin', loginController.findUser);
};
