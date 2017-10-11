import express from 'express';

import ForgetPasswordController from '../controllers/ForgetPasswordController';

const app = express.Router();

app.post('/api/v1/sendSecretCode', ForgetPasswordController.sendSecretCode);
app.post('/api/v1/resetPassword',
  ForgetPasswordController.VerifyCodeAndUpdatePassword);

export default app;
