import bcrypt from 'bcrypt';
import db from '../models';
import generateCode from '../helpers/generateCode';
import mailSender from '../helpers/mailSender';
import isValidField from '../helpers/isValidField';

const User = db.User;

/**
   * @description send secret code to users that has forgoten their password
   * 
   * @param  {object} req
   * @param  {object} res
   * @return {string} an object with key: group, value: number of new messages in the group
   */
export const sendSecretCode = (req, res) => {
  User.findOne({
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
        mailSender(req, res, message, 'A code has been sent to your mail', hashSecret, email);
      });
    });
};

/**
   * @description Verify secrete code sent to users 
   * 
   * @param  {object} req
   * @param  {object} res
   */

export const VerifyCodeAndUpdatePassword = (request, response) => {
  bcrypt.compare(request.body.response, request.body.hash, (err, res) => {
    if (res) {
      if (isValidField(request.body.password)) {
        return res.status(403).json({
          success: false,
          message: 'This field is required'
        });
      } else if (request.body.password.length < 9 || !(/[0-9]/
        .test(request.body.password) && /[a-z A-Z]/.test(request.body.password))) {
        return response.status(403).json({
          success: false,
          message: 'Weak password. Password should contain at least 8 characters including at least one number and alphabet'
        });
      }
      bcrypt.hash(request.body.password, 10, (err, hash) => {
        User.update({
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
          .catch(error => response.status(404).send(error));
      });
    } else {
      return response.status(400).json({
        success: false,
        message: 'Invalid code'
      });
    }
  });
};
