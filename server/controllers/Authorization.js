import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import dataBase from '../models';
import { generateToken } from '../helpers/index';

dotenv.load();
const userModel = dataBase.User;
const secret = process.env.secretKey;


const Authorization = {
  /**
 *@description controls users login through the route
 * POST: /api/v1/user/signin
 * 
 * @param  {object} request request object
 * @param  {object} response responsee object
 * 
 * @return {object} response containing the user token
 */
  logIn(request, response) {
    return userModel
      .findOne({
        where: {
          userName: request.body.userName
        }
      })
      .then((user) => {
        if (!user) {
          return response.status(401).json(
            { success: false,
              message: 'Authentication failed. wrong username or password.'
            });
        }
        bcrypt.compare(request.body.password, user.password, (err, res) => {
          if (res) {
            const currentUser = { userName: user.userName,
              id: user.id,
              fullName: user.fullName,
              email: user.email,
              phoneNumber: user.phoneNumber,
            };
            const token = generateToken(currentUser, secret);
            userModel.update({
              active: true
            },
            {
              where: {
                id: user.id
              }
            })
              .then(() => {
                response.status(200).json({
                  success: true,
                  message: 'User sign in successfully',
                  Token: token,
                });
              })
              .catch(() => response.status(500).json({
                success: false,
                message: 'Server error'
              }));
          } else {
            return response.status(401).json(
              { success: false,
                message: 'Authentication failed. wrong username or password.'
              });
          }
        });
      })
      .catch(() => response.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   *@description controls a user registration through the route
   * POST: /api/v1/user/signup
   *
   * @param  {object} req  request object
   * @param  {object} res  response object
   * 
   * @return {object} response containing the user token
   */

  logOut(req, res) {
    userModel.update({
      active: false
    }, {
      where: {
        userName: req.currentUser.currentUser.userName
      }
    }).then(() => {
      res.status(200).json({
        success: true,
        message: 'logout successfully'
      });
    })
      .catch(() => response.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   *@description controls a user google signup through the route
   * POST: /api/v1/user/googleSignin
   *
   * @param  {object} req  request object
   * @param  {object} res  response object
   * 
   * @return {object} response containing the user token or action status
   */

  googleSignin(req, res) {
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
      .then((googleUser) => {
        if (!googleUser) {
          return res.status(200).json({
            success: true,
            message: 'New user'
          });
        }
        const currentUser = {
          id: googleUser.id,
          fullName: googleUser.fullName,
          email: googleUser.email,
          userName: googleUser.userName,
          phoneNumber: googleUser.phoneNumber
        };
        const token = generateToken(currentUser, secret);
        return res.status(200).json({
          success: true,
          message: 'signin with google successfully',
          token
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  }
};

export default Authorization;
