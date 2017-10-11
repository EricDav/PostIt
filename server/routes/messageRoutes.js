import express from 'express';

import GroupMessagesController from '../controllers/GroupMessagesController';
import authorization from '../middlewares/authorization';
import GroupValidator from '../middlewares/GroupValidator';

const messageRoutes = express.Router();

messageRoutes.post('/api/v1/groups/:groupId/message',
  authorization, GroupValidator.getGroupValidator,
  GroupMessagesController.createMessage);

messageRoutes.get('/api/v1/groups/:groupId/messages',
  authorization, GroupValidator.getGroupValidator,
  GroupMessagesController.getMessages);

export default messageRoutes;
