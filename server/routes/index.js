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
app.post('/api/group/:groupId/user', groupMembersController.create);
app.post('/api/group/:postId/message', groupPostsController.create);
app.post('/api/user/signin', loginController.findUser);
app.get('/api/group/:groupId/messages', groupValidator.getGroupMessagesValidation, groupMessagesController.getPosts);
app.get('/api/user/:userId/groups', auth, userController.userGroups);
app.get('/api/group/:groupId/members', groupMembersController.getGroupmMembers);
app.get('/api/group/:groupId/nonMembers', groupMembersController.getNonGroupmMembers);
app.delete('/api/group/:groupId/delete', groupController.Delete);
export default app;
