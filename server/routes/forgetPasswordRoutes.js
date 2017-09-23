import express from 'express';

import { sendSecretCode, VerifyCodeAndUpdatePassword }
  from '../controllers/forgetPassword';

const app = express.Router();

app.post('/api/v1/sendSecretCode', sendSecretCode);
app.post('/api/v1/resetPassword', VerifyCodeAndUpdatePassword);

export default app;
