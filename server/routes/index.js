const userController = require('../controllers/user');
const groupController = require('../controllers/grup');
const groupMembersController = require('../controllers/groupMember');
const groupPostsController = require('../controllers/grouPost');
const loginController = require('../controllers/login');
const auth = require('../middlewares/auth');


module.exports = (app) => {
  app.get('/api/allUsers', userController.allUsers);
  app.post('/api/group', auth, groupController.create);
  app.post('/api/user/signup', userController.create);
  app.post('/api/group/:groupId/user', auth, groupMembersController.create);
  app.post('/api/group/:postId/message', auth, groupPostsController.create);
  app.post('/api/user/signin', loginController.findUser);
};

