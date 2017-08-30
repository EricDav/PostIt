import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models';

dotenv.load();
const User = db.User;
const secret = process.env.secretKey;
/**
 *@description Auntheticate user.
 * 
 * @param  {object} req request object
 * @param  {object} res responsee object
 * @return {object} user information
 */
export const logIn = {
  logIn(request, response) {
    return User
      .findOne({
        where: {
          username: request.body.username
        }
      })
      .then((user) => {
        if (!user) {
          return response.status(401).json({ success: false, message: 'Authentication failed. wrong username or password.' });
        }
        bcrypt.compare(request.body.password, user.password, (err, res) => {
          if (res) {
            const currentUser = { username: user.username,
              id: user.id,
              fullname: user.fullname,
              email: user.email,
              phoneNumber: user.phoneNumber,
            };
            const token = jwt.sign(
              { currentUser,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
              }, secret
            );
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
                  message: 'Token generated successfully',
                  Token: token,
                });
              })
              .catch(error => response.status(400).send(error));
          } else {
            return response.status(401).json({ success: false, message: 'Authentication failed. wrong username or password.' });
          }
        });
      })
      .catch(error => response.status(500).send(error));
  }
};

/**
   *@description sign a user out and deactive a user
   *
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @return {void} no returns
   */

export const logOut = {
  logOut(req, res) {
    User.update({
      active: false
    }, {
      where: {
        username: req.currentUser.currentUser.username
      }
    }).then(() => {
      res.status(200).json({
        success: true,
        message: 'logout successfully'
      });
    })
      .catch(error => res.status(500).send(error));
  }
};
