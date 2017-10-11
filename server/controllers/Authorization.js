import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import dataBase from '../models';
import { generateToken } from '../helpers/index';

dotenv.load();
const User = dataBase.User;
const secret = process.env.secretKey;


const Authorization = {
  /**
 *@description Auntheticate user.
 * 
 * @param  {object} request request object
 * @param  {object} response responsee object
 * 
 * @return {object} user information
 */
  logIn(request, response) {
    return User
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
            User.update({
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
              .catch(error => response.status(400).send(error));
          } else {
            return response.status(401).json(
              { success: false,
                message: 'Authentication failed. wrong username or password.'
              });
          }
        });
      })
      .catch(error => response.status(500).send(error));
  },

  /**
   *@description sign a user out and deactive a user
   *
   * @param  {object} req  request object
   * @param  {object} res  response object
   * 
   * @return {void} no returns
   */

  logOut(req, res) {
    User.update({
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
      .catch(error => res.status(500).send(error));
  },

  googleSignin(req, res) {
    if ((req.body.email.slice(req.body.email.length - 4, req.body.email.length)
     !== '.com' || !(/[@]/.test(req.body.email)))) {
      return res.status(400).json({
        message: 'Invalid email',
        success: false
      });
    }
    User.findOne({
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
