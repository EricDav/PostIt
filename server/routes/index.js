import express from 'express';
import userController from '../controllers/user';
import groupController from '../controllers/group';
import { logIn, logOut } from '../controllers/login';
import auth from '../middlewares/auth';
import userValidator from '../middlewares/userValidation';
import groupMessagesController from '../controllers/groupMessages';
import groupValidator from '../middlewares/groupValidation';
import userUpdateValidation from '../middlewares/update';

const app = express.Router();
app.get('/api/allUsers', auth, userController.allUsers);
<<<<<<< HEAD
app.post('/api/group', auth, groupValidator.groupNullValidation, groupController.create);
app.post('/api/user/signup', userValidator.basicValidation, userController.create);
=======
app.post('/api/user/signin', logIn.logIn);
app.post('/api/user/signup', userValidator.basicValidation, userController.create);
app.put('/api/user/signout', auth, logOut.logOut);
app.put('/api/user/update', auth, userUpdateValidation.basicUserUpdateValidation, userController.updateUserInfo);
>>>>>>> server-side-implementation
app.post('/api/group/:groupId/user', auth, groupValidator.groupValidation, groupValidator.userValidation, groupController.addUser);
app.post('/api/group', auth, groupValidator.groupNullValidation, groupController.create);
app.post('/api/group/:groupId/message', auth, groupValidator.groupValidation, groupMessagesController.createMessage);
app.get('/api/group/:groupId/messages', auth, groupValidator.groupValidation, groupMessagesController.getMessages);
app.get('/api/groups', auth, groupController.getGroups);
app.put('/api/group/update', auth, groupController.updateGroupInfo);
app.get('/api/group/:groupId/members', auth, groupValidator.groupValidation, groupController.getGroupMembers);
app.get('/api/messages', auth, userController.userMessages);
app.get('/api/notification', auth, userController.userNotifications);
app.put('/api/resetpassword', auth, userController.resetPassword);
export default app;
