const userController = require('../controllers/user');
const groupController = require('../controllers/grup');
const groupMembersController = require('../controllers/groupMember');
const groupPostsController = require('../controllers/grouPost');
const loginController = require('../controllers/login');
const auth = require('../middlewares/auth');

module.exports = (app) => {
  app.get('/api/allusers', userController.allUsers);
  app.post('/api/group', groupController.create);
  app.post('/api/user/signup', userController.create);
  app.post('/api/group/:groupId/user', groupMembersController.create);
  app.post('/api/group/:postId/message', groupPostsController.create);
  app.post('/api/user/signin', loginController.findUser);
};

