import express from 'express';

import Authorization from '../controllers/Authorization';
import UserController from '../controllers/UserController';
import userValidation from '../middlewares/userValidator';
import authorization from '../middlewares/authorization';
import update from '../middlewares/validateUpdatedUser';

const userRoutes = express.Router();

userRoutes.post('/api/v1/user/signup',
  userValidation, UserController.create);

userRoutes.post('/api/v1/user/signin', Authorization.logIn);

userRoutes.put('/api/v1/user/signout', authorization, Authorization.logOut);

userRoutes.get('/api/v1/groups/:groupId/message/viewers', authorization,
  UserController.getMessagesWithSeenUsers);
userRoutes.get('/api/v1/users/:searchKey/search', authorization,
  UserController.searchUsers);

userRoutes.put('/api/v1/resetpassword',
  authorization, UserController.resetPassword);

userRoutes.get('/api/v1/newMessages', authorization,
  UserController.getMessages);

userRoutes.put('/api/v1/groups/:groupId/updateSeenMessages',
  authorization, UserController.updateSeenMessages);

userRoutes.put('/api/v1/user/update', authorization,
  update, UserController.updateUserInfo);

userRoutes.post('/api/v1/user/googleSignin', Authorization.googleSignin);

export default userRoutes;
