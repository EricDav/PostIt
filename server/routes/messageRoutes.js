import express from 'express';

import groupMessages from '../controllers/groupMessages';
import auth from '../middlewares/auth';
import groupValidation from '../middlewares/groupValidation';

const messageRoutes = express.Router();

messageRoutes.post('/api/v1/groups/:groupId/message',
  auth, groupValidation.groupValidation,
  groupMessages.createMessage);

messageRoutes.get('/api/v1/groups/:groupId/messages',
  auth, groupValidation.groupValidation,
  groupMessages.getMessages);

export default messageRoutes;
