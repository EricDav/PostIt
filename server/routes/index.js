<<<<<<< HEAD
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
||||||| merged common ancestors
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
  app.post('/api/group/:groupId/user', groupMembersController.create);
  app.post('/api/group/:postId/message', groupPostsController.create);
  app.post('/api/user/signin', loginController.findUser);
};
=======
import express from 'express';
import userController from '../controllers/user';
import groupController from '../controllers/grup';
import groupMembersController from '../controllers/groupMember';
import groupPostsController from '../controllers/grouPost';
import loginController from '../controllers/login';
import auth from '../middlewares/auth';
import userValidator from '../middlewares/userValidation';
import groupMessagesController from '../controllers/groupMessages';
import groupValidator from '../middlewares/groupValidation';

const app = express.Router();
app.get('/api/allUsers', auth, userController.allUsers);
app.post('/api/group', auth, groupValidator.groupValidation, groupController.create);
app.post('/api/user/signup', userValidator.basicValidation, userValidator.emailValidation, userController.create);
app.post('/api/group/:groupId/user', auth, groupMembersController.create);
app.post('/api/group/:postId/message', auth, groupPostsController.create);
app.post('/api/user/signin', loginController.findUser);
app.get('/api/group/:groupId/messages', groupMessagesController.getPosts);
export default app;
>>>>>>> test
