import express from 'express';
import userController from '../controllers/user';
import groupController from '../controllers/group';
import { logIn, logOut } from '../controllers/login';
import auth from '../middlewares/auth';
import userValidator from '../middlewares/userValidation';
import groupMessagesController from '../controllers/groupMessages';
import groupValidator from '../middlewares/groupValidation';
import userUpdateValidation from '../middlewares/update';
import sendEmail from '../helpers/email';
import { sendSecretCode, VerifyCodeAndUpdatePassword } from '../controllers/forgetPassword';
import feedback from '../controllers/feedback';

const app = express.Router();
app.get('/api/v1/allUsers', auth, userController.allUsers);
app.delete('/api/v1/group/:groupId/delete', auth, groupValidator.deleteGroupValidation,
  groupController.deleteGroup);
app.delete('/api/v1/group/:groupId/user/delete', auth, groupValidator.deleteUserFromGroupValidation,
  groupController.deleteUser);
app.post('/api/v1/user/signin', logIn.logIn);
app.post('/api/v1/user/signup', userValidator.basicValidation, userController.create);
app.post('/api/v1/sendSecretCode', sendSecretCode);
app.post('/api/v1/resetPassword', VerifyCodeAndUpdatePassword);
app.put('/api/v1/user/signout', auth, logOut.logOut);
app.put('/api/v1/user/update', auth, userUpdateValidation, userController.updateUserInfo);
app.post('/api/v1/group/:groupId/user', auth,
  groupValidator.groupValidation, groupValidator.userValidation, groupController.addUser);
app.post('/api/v1/group', auth, groupValidator.groupNullValidation, groupController.create);
app.post('/api/v1/group/:groupId/message', auth, groupValidator.groupValidation,
  sendEmail, groupMessagesController.createMessage);
app.get('/api/v1/group/:groupId/messages', auth, groupValidator.groupValidation,
  groupMessagesController.getMessages);
app.get('/api/v1/groups', auth, groupController.getGroups);
app.put('/api/v1/group/update', auth, groupController.updateGroupInfo);
app.get('/api/v1/group/:groupId/members', auth, groupValidator.groupValidation,
  groupController.getGroupMembers);
app.get('/api/v1/group/:groupId/message/viewers', auth,
  userController.getMessagesWithSeenUsers);
app.put('/api/v1/resetpassword', auth, userController.resetPassword);
app.get('/api/v1/newMessages', auth, userController.getMessages);
app.get('/api/v1/user', auth, userController.getUser);
app.put('/api/v1/group/:groupId/updateSeenMessages', auth, userController.updateSeenMessages);
app.post('/api/v1/feedback', auth, feedback);
export default app;
