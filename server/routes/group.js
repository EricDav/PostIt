import express from 'express';

import groupInfo from '../controllers/groupInfo';
import groupValidator from '../middlewares/groupValidation';
import auth from '../middlewares/auth';

const group = express.Router();

group.delete('/api/v1/groups/:groupId/delete', auth, groupValidator.deleteGroupValidation,
  groupInfo.deleteGroup);

group.delete('/api/v1/groups/:groupId/users/:userId/delete', auth,
  groupValidator.deleteUserFromGroupValidation, groupInfo.deleteUser);

group.post('/api/v1/groups/:groupId/user', auth,
  groupValidator.groupValidation, groupValidator.userValidation, groupInfo.addUser);

group.post('/api/v1/group', auth, groupValidator.groupNullValidation, groupInfo.create);

group.post('/api/v1/groups/:groupId/message', auth, groupValidator.groupValidation);

group.put('/api/v1/groups/:groupId/update', auth, groupValidator.groupNullValidation,
  groupInfo.updateGroupInfo);

group.get('/api/v1/groups/:groupId/members', auth, groupValidator.groupValidation,
  groupInfo.getGroupMembers);

group.get('/api/v1/groups', auth, groupInfo.getGroups);

export default group;
