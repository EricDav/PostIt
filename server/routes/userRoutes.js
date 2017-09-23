import express from 'express';

import { logIn, logOut } from '../controllers/auth';
import userController from '../controllers/user';
import userValidation from '../middlewares/userValidation';
import auth from '../middlewares/auth';
import update from '../middlewares/update';

const userRoutes = express.Router();

userRoutes.get('/api/v1/allUsers', auth, userController.allUsers);

userRoutes.post('/api/v1/user/signup',
  userValidation.basicValidation, userController.create);

userRoutes.post('/api/v1/user/signin', logIn.logIn);

userRoutes.put('/api/v1/user/signout', auth, logOut.logOut);

userRoutes.get('/api/v1/groups/:groupId/message/viewers', auth,
  userController.getMessagesWithSeenUsers);
userRoutes.get('/api/v1/users/:searchKey/search', auth,
  userController.searchUsers);

userRoutes.put('/api/v1/resetpassword', auth, userController.resetPassword);

userRoutes.get('/api/v1/newMessages', auth, userController.getMessages);

userRoutes.put('/api/v1/groups/:groupId/updateSeenMessages',
  auth, userController.updateSeenMessages);

userRoutes.put('/api/v1/user/update', auth,
  update, userController.updateUserInfo);

userRoutes.post('/api/v1/user/googleSignin', userController.googleSignin);  

export default userRoutes;
