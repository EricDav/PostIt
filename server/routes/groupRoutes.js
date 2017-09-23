import express from 'express';

import group from '../controllers/group';
import groupValidator from '../middlewares/groupValidation';
import auth from '../middlewares/auth';

const groupRoutes = express.Router();

groupRoutes.delete('/api/v1/groups/:groupId/delete',
  auth, groupValidator.deleteGroupValidation, group.deleteGroup);

groupRoutes.delete('/api/v1/groups/:groupId/users/:userId/delete', auth,
  groupValidator.deleteUserFromGroupValidation, group.deleteUser);

groupRoutes.post('/api/v1/groups/:groupId/user', auth,
  groupValidator.groupValidation,
  groupValidator.userValidation, group.addUser);

groupRoutes.post('/api/v1/group', auth,
  groupValidator.groupNullValidation, group.create);

groupRoutes.put('/api/v1/groups/:groupId/update',
  auth, groupValidator.groupNullValidation,
  group.updateGroupInfo);

groupRoutes.get('/api/v1/groups/:groupId/members',
  auth, groupValidator.groupValidation,
  group.getGroupMembers);

groupRoutes.get('/api/v1/groups', auth, group.getGroups);

export default groupRoutes;
