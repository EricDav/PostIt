import express from 'express';

import groupMessagesController from '../controllers/groupMessages';
import auth from '../middlewares/auth';
import sendEmail from '../helpers/email';
import groupValidator from '../middlewares/groupValidation';

const app = express.Router();

app.post('/api/v1/group/:groupId/message', auth, groupValidator.groupValidation,
  sendEmail, groupMessagesController.createMessage);
app.get('/api/v1/group/:groupId/messages', auth, groupValidator.groupValidation,
  groupMessagesController.getMessages);

export default app;
