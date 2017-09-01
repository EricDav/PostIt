import express from 'express';

import { logIn, logOut } from '../controllers/login';
import userController from '../controllers/user';
import userValidator from '../middlewares/userValidation';
import auth from '../middlewares/auth';
import userUpdateValidation from '../middlewares/update';

const app = express.Router();

app.get('/api/v1/allUsers', auth, userController.allUsers);
app.post('/api/v1/user/signup', userValidator.basicValidation, userController.create);
app.post('/api/v1/user/signin', logIn.logIn);
app.put('/api/v1/user/signout', auth, logOut.logOut);
app.get('/api/v1/group/:groupId/message/viewers', auth,
  userController.getMessagesWithSeenUsers);
app.put('/api/v1/resetpassword', auth, userController.resetPassword);
app.get('/api/v1/newMessages', auth, userController.getMessages);
app.get('/api/v1/user', auth, userController.getUser);
app.put('/api/v1/group/:groupId/updateSeenMessages', auth, userController.updateSeenMessages);
app.put('/api/v1/user/update', auth, userUpdateValidation, userController.updateUserInfo);
app.post('/api/v1/user/googleSignin', userController.googleSignin);

export default app;
