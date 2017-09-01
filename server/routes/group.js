import express from 'express';

import groupController from '../controllers/group';
import groupValidator from '../middlewares/groupValidation';
import auth from '../middlewares/auth';

const app = express.Router();

app.delete('/api/v1/group/:groupId/delete', auth, groupValidator.deleteGroupValidation,
  groupController.deleteGroup);

app.post('/api/v1/group/:groupId/user', auth,
  groupValidator.groupValidation, groupValidator.userValidation, groupController.addUser);
app.post('/api/v1/group', auth, groupValidator.groupNullValidation, groupController.create);
app.post('/api/v1/group/:groupId/message', auth, groupValidator.groupValidation);
app.put('/api/v1/group/:groupId/update', auth, groupController.updateGroupInfo);
app.get('/api/v1/group/:groupId/members', auth, groupValidator.groupValidation,
  groupController.getGroupMembers);
app.get('/api/v1/groups', auth, groupController.getGroups);

export default app;
