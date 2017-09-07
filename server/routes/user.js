import express from 'express';

import { logIn, logOut } from '../controllers/auth';
import userController from '../controllers/user';
import userValidation from '../middlewares/userValidation';
import auth from '../middlewares/auth';
import update from '../middlewares/update';

const user = express.Router();

user.get('/api/v1/allUsers', auth, userController.allUsers);

user.post('/api/v1/user/signup', userValidation.basicValidation, userController.create);

user.post('/api/v1/user/signin', logIn.logIn);

user.put('/api/v1/user/signout', auth, logOut.logOut);

user.get('/api/v1/groups/:groupId/message/viewers', auth,
  userController.getMessagesWithSeenUsers);

user.put('/api/v1/resetpassword', auth, userController.resetPassword);

user.get('/api/v1/newMessages', auth, userController.getMessages);

user.put('/api/v1/groups/:groupId/updateSeenMessages', auth, userController.updateSeenMessages);

user.put('/api/v1/user/update', auth, update, userController.updateUserInfo);

user.post('/api/v1/user/googleSignin', userController.googleSignin);

export default user;
