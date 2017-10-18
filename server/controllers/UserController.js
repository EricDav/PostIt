import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import database from '../models';
import { removeCurrentUserFromSearchResult,
  isInValidField, removePassword, generateToken }
  from '../helpers/index';

dotenv.load();
const secret = process.env.secretKey;
const userModel = database.User;

const UserController = {
  /**
 *  @description create a user through the route /api/v1/user/signup
 * 
 * @param  {object} req request object
 * @param  {object} res response object
 * 
 * @return {object} created user object
 */
  create(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'An error occured while encrypting password'
        });
      }
      return userModel
        .create({
          fullName: req.body.fullName,
          userName: req.body.userName.toLowerCase(),
          password: hash,
          email: req.body.email.toLowerCase(),
          phoneNumber: req.body.phoneNumber,
          active: true
        })
        .then((createdUser) => {
          const currentUser = {
            userName: createdUser.userName,
            fullName: createdUser.fullName,
            id: createdUser.id,
            email: createdUser.email,
            phoneNumber: createdUser.phoneNumber,
          };
          const token = generateToken(currentUser, secret);
          return res.status(201).json({
            success: true,
            message: 'User signed up successfully',
            Token: token
          });
        })
        .catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
              success: false,
              error: {
                message: error.errors[0].message,
              }
            });
          }
          res.status(500).json({
            success: false,
            message: 'Server error'
          });
        });
    });
  },

  /**
   * @description fetch users base on search inputs through
   * route /api/v1/users/:searchKey/search
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return {object} response containing the searched users
   */
  searchUsers(req, res) {
    userModel.findAll({
      where: {
        userName: {
          $iLike: `%${req.params.searchKey}%`
        }
      }
    }).then((searchedUsers) => {
      res.status(200).json({
        success: true,
        searchedUsers: removePassword(
          removeCurrentUserFromSearchResult(
            req.currentUser.currentUser.userName,
            searchedUsers))
      });
    })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   *@description update user details through the
   * route PUT: /api/v1/user/update
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return {object} response containing the updated user
   */

  updateUserInfo(req, res) {
    const updatedUser = {
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      fullName: req.body.fullName
    };
    if (!req.body.email) {
      updatedUser.email = req.currentUser.currentUser.email;
    }
    if (!req.body.fullName) {
      updatedUser.fullName = req.currentUser.currentUser.fullName;
    }
    if (!req.body.phoneNumber) {
      updatedUser.phoneNumber = req.currentUser.currentUser.phoneNumber;
    }
    userModel.update({
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      phoneNumber: updatedUser.phoneNumber
    }, {
      where: {
        id: req.currentUser.currentUser.id
      }
    })
      .then(() => {
        res.status(201).json({
          success: true,
          message: 'User info has been updated'
        });
      })
      .catch(error => res.status(500).json({
        error,
        success: false,
        message: 'Server error'
      }));
  },

  /**
   * @description reset user password through the route
   * PUT: /api/v1/resetpassword
   * 
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return {object} response object containing the status of the action
   */

  resetPassword(req, res) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    userModel.findOne({
      where: {
        id: req.currentUser.currentUser.id
      }
    }).then((resetUser) => {
      bcrypt.compare(oldPassword, resetUser.password, (error, response) => {
        if (response) {
          if (isInValidField(newPassword)) {
            return res.status(400).json({
              success: false,
              message: 'This field is required'
            });
          } else if (req.body.newPassword.length < 9) {
            return res.status(400).json({
              success: false,
              message: 'Password should contain at least 8 characters'
            });
          } else if (!/[0-9]/.test(req.body.newPassword)) {
            return res.status(400).json({
              success: false,
              message: 'Password should contain at least one number'
            });
          } else if (!/[a-z A-Z]/.test(req.body.newPassword)) {
            return res.status(400).json({
              success: false,
              message: 'Password should contain at least one character'
            });
          }
          bcrypt.hash(newPassword, 10, (err, hash) => {
            userModel.update({
              password: hash
            }, {
              where: {
                id: req.currentUser.currentUser.id
              }
            })
              .then(() => {
                res.status(201).json({
                  success: true,
                  message: 'Password has been reset'
                });
              })
              .catch(() => res.status(500).send({
                success: false,
                message: 'Server error'
              }));
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Invalid old password'
          });
        }
      });
    })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },
};

export default UserController;
