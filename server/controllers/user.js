import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import db from '../models';
import isValidField from '../helpers/isValidField';
import removePassword from '../helpers/removePassword';
import getNewMessages from '../helpers/getNewMessages';
import genToken from '../helpers/genToken';

dotenv.load();
const secret = process.env.secretKey;
const User = db.User;
const message = db.Message;
const viewMessages = db.messageViewer;
const seenLast = db.SeenLast;
/**
 *  @description create a user with name, username, email, phone number and password.
 * 
 * @param  {object} req
 * @param  {object} res
 */
const user = {
  create(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'An error occured while encrypting password'
        });
      }
      return User
        .create({
          fullname: req.body.fullname,
          username: req.body.username,
          password: hash,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          active: true
        })
        .then((createdUser) => {
          const currentUser = {
            username: createdUser.username,
            fullname: createdUser.fullname,
            id: createdUser.id,
            email: createdUser.email,
            phoneNumber: createdUser.phoneNumber,
          };
          const token = genToken(currentUser, secret);
          return res.status(201).json({
            success: true,
            message: 'Token generated successfully',
            Token: token
          });
        })
        .catch(error => res.status(500).send(error));
    });
  },

  /**
   * @description fetch all the users from database
   *
   * @param  {object} req
   * @param  {object} res
   * @return {array} all users in an array
   */
  allUsers(req, res) {
    return User
      .all()
      .then((users) => {
        res.status(200).send(removePassword(users));
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   *@description update user uptable details like fullname, email and phone number
   *
   * @param  {object} req
   * @param  {object} res
   */

  updateUserInfo(req, res) {
    const updatedUser = {
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      fullname: req.body.fullname
    };
    if (!req.body.email) {
      updatedUser.email = req.currentUser.currentUser.email;
    }
    if (!req.body.fullname) {
      updatedUser.fullname = req.currentUser.currentUser.fullname;
    }
    if (!req.body.phoneNumber) {
      updatedUser.phoneNumber = req.currentUser.currentUser.phoneNumber;
    }
    User.update({
      email: updatedUser.email,
      fullname: updatedUser.fullname,
      phoneNumber: updatedUser.phoneNumber
    }, {
      where: {
        id: req.currentUser.currentUser.id
      }
    }).then(() => {
      res.status(201).json({
        success: true,
        message: 'User info has been updated'
      });
    })
      .catch(error => res.status(401).send(error));
  },

  /**
   * @description reset users password given the user provide the initial password
   * 
   * @param  {object} req request object
   * @param  {object} res response object
   */

  resetPassword(req, res) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    User.findOne({
      where: {
        id: req.currentUser.currentUser.id
      }
    }).then((resetUser) => {
      bcrypt.compare(oldPassword, resetUser.password, (error, response) => {
        if (response) {
          if (isValidField(newPassword)) {
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
              message: 'Password should contain at least one number'
            });
          }
          bcrypt.hash(newPassword, 10, (err, hash) => {
            User.update({
              password: hash
            }, {
              where: {
                id: user.id
              }
            })
              .then(() => {
                res.status(201).json({
                  success: true,
                  message: 'Password has been reset'
                });
              })
              .catch(err => res.status(500).send(err));
          });
        } else {
          return res.status(400).json({
            success: false,
            message: 'Invalid old password'
          });
        }
      });
    })
      .catch(error => res.status(500).send(error));
  },

  /**
   * @description fetch all the messages and those that has seen
   * them from a specific group the current users belongs to.
   * 
   * @param  {object} request object
   * @param  {object} response object
   * @return {array} all messages and viewers in an array
   */

  getMessagesWithSeenUsers(req, res) {
    let allViewMessages = [];
    let viewerObject = { viewers: [] };
    const viewerData = [];
    seenLast.findOne({
      where: {
        seenUsername: req.currentUser.currentUser.username,
        groupId: req.params.groupId
      }
    })
      .then((viewer) => {
        if (viewer === null) {
          viewer = { seenLast: 0 };
          seenLast.create({
            seenUsername: req.currentUser.currentUser.username,
            groupId: req.params.groupId,
            seenLast: 0
          })
            .catch(error => res.status(500).send(error));
        }
        viewMessages.all()
          .then((viewers) => {
            if (!viewers) {
              allViewMessages = [];
            } else {
              allViewMessages = viewers;
            }
          });
        message
          .findAll({
            where: {
              groupId: req.params.groupId
            }
          }).then((messages) => {
            messages.forEach((Message) => {
              allViewMessages.forEach((messageViewer) => {
                if (messageViewer.seenMessageIds.includes(Message.id)) {
                  viewerObject.viewers.push(messageViewer.viewerUsername);
                }
              });
              viewerObject.message = Message;
              viewerData.push(viewerObject);
              viewerObject = { viewers: [] };
            });
            res.status(200).json({
              success: true,
              data: viewerData,
              seenLast: viewer.seenLast
            });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(402).send(error));
  },

  /**
   * @description update the messages that have been seen by a user
   * 
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   */

  updateSeenMessages(req, res) {
    viewMessages.findOne({
      where: {
        viewerUsername: req.currentUser.currentUser.username
      }
    })
      .then((viewer) => {
        if (!viewer) {
          viewMessages.create({
            viewerUsername: req.currentUser.currentUser.username,
            seenMessageIds: req.body.seenMessageIds,
          })
            .then((view) => {
              seenLast.update({
                seenLast: req.body.seenLast
              }, {
                where: {
                  seenUsername: req.currentUser.currentUser.username,
                  groupId: req.params.groupId
                }
              })
                .then(() => {
                  res.status(201).json({
                    success: true,
                    message: `created view messages for ${view.viewerUsername} successfully`
                  });
                })
                .catch(error => res.status(500).send(error));
            })
            .catch(error => res.status(500).send(error));
        } else {
          viewMessages.update({
            seenMessageIds: req.body.seenMessageIds
          }, {
            where: {
              viewerUsername: req.currentUser.currentUser.username
            }
          })
            .then(() => {
              seenLast.update({
                seenLast: req.body.seenLast,
              }, {
                where: {
                  seenUsername: req.currentUser.currentUser.username,
                  groupId: req.params.groupId
                }
              })
                .then(() => {
                  res.status(201).json({
                    success: true,
                    message: 'seen messages updated successfully'
                  });
                })
                .catch(error => res.status(500).send(error));
            })
            .catch(error => res.status(500).send(error));
        }
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   *  @description It gets all the numbers of new messages in all the groups a user belongs to
   * 
   * @param  {object} req
   * @param  {object} res
   * @return {object} an object with key: group, value: number of new messages in the group
   */
  getMessages(req, res) {
    User.findOne({
      where: {
        id: req.currentUser.currentUser.id
      }
    })
      .then((currentUser) => {
        currentUser.getGroups().then((Groups) => {
          const groupIds = [];
          Groups.forEach((group) => {
            groupIds.push(group.id);
          });
          message.findAll({
            where: {
              groupId: groupIds
            }
          })
            .then((messages) => {
              seenLast.findAll({
                groupId: groupIds,
              })
                .then((seenLasts) => {
                  if (!seenLasts) {
                    seenLasts = [];
                  }
                  const newMessages = [];
                  const userSeenLast = [];
                  seenLasts.forEach((seenlast) => {
                    if (seenlast.seenUsername === req.currentUser.currentUser.username) {
                      userSeenLast.push(seenlast);
                    }
                  });
                  groupIds.forEach((groupId) => {
                    newMessages.push(getNewMessages(groupId, messages, userSeenLast));
                  });
                  return res.status(200).send(newMessages);
                })
                .catch(error => res.status(500).send(error));
            })
            .catch(error => res.status(500).send(error));
        })
          .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
  },

  googleSignin(req, res) {
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
          fullname: googleUser.fullname,
          email: googleUser.email,
          username: googleUser.username,
          phoneNumber: googleUser.phoneNumber
        };
        const token = genToken(currentUser, secret);
        res.status(200).json({
          success: true,
          message: 'signup with google successfully',
          token
        });
      })
      .catch(error => res.status(500).send(error));
  }
};

export default user;
