import express from 'express';

import groupMessages from '../controllers/groupMessages';
import auth from '../middlewares/auth';
import email from '../helpers/email';
import groupValidation from '../middlewares/groupValidation';

const message = express.Router();

message.post('/api/v1/groups/:groupId/message', auth, groupValidation.groupValidation,
  email, groupMessages.createMessage);

message.get('/api/v1/groups/:groupId/messages', auth, groupValidation.groupValidation,
  groupMessages.getMessages);

export default message;
