import express from 'express';

import GroupController from '../controllers/GroupController';
import GroupValidator from '../middlewares/GroupValidator';
import authorization from '../middlewares/authorization';

const groupRoutes = express.Router();

groupRoutes.delete('/api/v1/groups/:groupId/delete',
  authorization, GroupValidator.deleteGroupValidator,
  GroupController.deleteGroup);

groupRoutes.delete('/api/v1/groups/:groupId/users/:userId/delete',
  authorization,
  GroupValidator.deleteUserFromGroupValidator, GroupController.deleteUser);

groupRoutes.post('/api/v1/groups/:groupId/user', authorization,
  GroupValidator.getGroupValidator,
  GroupValidator.addUserValidator, GroupController.addUser);

groupRoutes.post('/api/v1/group', authorization,
  GroupValidator.createGroupValidator, GroupController.create);

groupRoutes.put('/api/v1/groups/:groupId/update',
  authorization, GroupValidator.createGroupValidator,
  GroupController.updateGroupInfo);

groupRoutes.get('/api/v1/groups/:groupId/members',
  authorization, GroupValidator.getGroupValidator,
  GroupController.getGroupMembers);

groupRoutes.get('/api/v1/groups', authorization, GroupController.getGroups);

export default groupRoutes;
