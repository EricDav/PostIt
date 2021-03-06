import bcrypt from 'bcrypt';

import dataBase from '../models';
import { generateCode, mailSender, isInValidField } from '../helpers/index';

const userModel = dataBase.User;

const ForgetPasswordController = {
/**
   * @description send secret code to users that has forgoten their password
   * through POST: /api/v1/sendSecretCode
   * 
   * 
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return {object} an object containing the status of the response
   */
  sendSecretCode(req, res) {
    if ((req.body.email.slice(req.body.email.length - 4, req.body.email.length)
     !== '.com' || !(/[@]/.test(req.body.email)))) {
      return res.status(400).json({
        message: 'Invalid email',
        success: false
      });
    }
    userModel.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            message: 'User does not exist'
          });
        }
        const generatedCode = generateCode();
        const email = req.body.email;
        const message = `Your Secrete code is: ${generatedCode}`;
        bcrypt.hash(generatedCode, 10, (err, hashSecret) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: 'Email was not sent',
              userEmail: req.body.email,
            });
          }
          mailSender(req, res, message, 'A code has been sent to your mail',
            hashSecret, email);
        });
      });
  },

  /**
   * @description Verify secrete code sent to users and reset their password
   * 
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return {object} response containing status of the action
   */

  VerifyCodeAndUpdatePassword(request, response) {
    bcrypt.compare(request.body.response, request.body.hash, (err, res) => {
      if (res) {
        if (isInValidField(request.body.password)) {
          return res.status(400).json({
            success: false,
            message: 'This field is required'
          });
        } else if (request.body.password.length < 9 || !(/[0-9]/
          .test(request.body.password) && /[a-z A-Z]/
            .test(request.body.password))) {
          return response.status(400).json({
            success: false,
            message: `Weak password. Password should contain at least 8 
          characters including at least one number and alphabet`
          });
        }
        bcrypt.hash(request.body.password, 10, (err, hash) => {
          userModel.update({
            password: hash
          }, {
            where: {
              email: request.body.userEmail
            }
          })
            .then(() => {
              response.status(200).json({
                success: true,
                message: 'Your password has been reset successfully'
              });
            })
            .catch(() => response.status(500).json({
              success: false,
              message: 'Server error'
            }));
        });
      } else {
        return response.status(400).json({
          success: false,
          message: 'Invalid code'
        });
      }
    });
  },
};

export default ForgetPasswordController;
