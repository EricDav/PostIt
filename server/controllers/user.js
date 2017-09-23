import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import database from '../models';
import { isInValidField, removePassword, getNewMessages, generateToken }
  from '../helpers/index';

dotenv.load();
const secret = process.env.secretKey;
const User = database.User;
const message = database.Message;
const viewMessages = database.messageViewer;
const seenLast = database.SeenLast;
/**
 *  @description create a user with name, username,
 *  email, phone number and password.
 * 
 * @param  {object} req request object
 * @param  {object} res response object
 * 
 * @return {object} created user object
 */
const user = {
  create(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'An error occured while encrypting password'
        });
      }
      return User
        .create({
          fullName: req.body.fullName,
          userName: req.body.userName,
          password: hash,
          email: req.body.email,
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
   * @description fetch all the users from database
   *
   * @param  {object} req
   * @param  {object} res
   * 
   * @return {array} all users in an array
   */
  allUsers(req, res) {
    return User
      .all()
      .then((users) => {
        res.status(200).send(removePassword(users));
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   * @description fetch all the users from database
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return {array} matched users
   */
  searchUsers(req, res) {
    User.findAll({
      where: {
        fullName: {
          $iLike: `%${req.params.searchKey}%`
        }
      }
    }).then((mathchedUsers) => {
      res.status(200).json({
        success: true,
        mathchedUsers: removePassword(mathchedUsers)
      });
    })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   *@description update user uptable details like 
   fullname, email and phone number
   *
   * @param  {object} req
   * @param  {object} res
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
    User.update({
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
   * @description reset users password given the
   * user provide the initial password
   * 
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return return void
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
              message: 'Password should contain at least one number'
            });
          }
          bcrypt.hash(newPassword, 10, (err, hash) => {
            User.update({
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

  /**
   * @description fetch all the messages and those that has seen
   * them from a specific group the current users belongs to.
   * 
   * @param  {object} request object
   * @param  {object} response object
   * 
   * @return {array} all messages and viewers in an array
   */

  getMessagesWithSeenUsers(req, res) {
    let allViewMessages = [];
    let viewerObject = { viewers: [] };
    const viewerData = [];
    seenLast.findOne({
      where: {
        seenUsername: req.currentUser.currentUser.userName,
        groupId: req.params.groupId
      }
    })
      .then((viewer) => {
        if (viewer === null) {
          viewer = { seenLast: 0 };
          seenLast.create({
            seenUsername: req.currentUser.currentUser.userName,
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
        viewerUsername: req.currentUser.currentUser.userName
      }
    })
      .then((viewer) => {
        if (!viewer) {
          viewMessages.create({
            viewerUsername: req.currentUser.currentUser.userName,
            seenMessageIds: req.body.seenMessageIds,
          })
            .then((view) => {
              seenLast.update({
                seenLast: req.body.seenLast
              }, {
                where: {
                  seenUsername: req.currentUser.currentUser.userName,
                  groupId: req.params.groupId
                }
              })
                .then(() => {
                  res.status(201).json({
                    success: true,
                    message: `created view messages for 
                    ${view.viewerUsername} successfully`
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
              viewerUsername: req.currentUser.currentUser.userName
            }
          })
            .then(() => {
              seenLast.update({
                seenLast: req.body.seenLast,
              }, {
                where: {
                  seenUsername: req.currentUser.currentUser.userName,
                  groupId: req.params.groupId
                }
              })
                .then(() => {
                  res.status(201).json({
                    success: true,
                    message: 'seen messages updated successfully'
                  });
                })
                .catch(() => res.status(500).send({
                  success: false,
                  message: 'Server error'
                }));
            })
            .catch(error => res.status(500).send(error));
        }
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   *  @description It gets all the numbers of
   * new messages in all the groups a user belongs to
   * 
   * @param  {object} req
   * @param  {object} res
   * @return {object} an object with key: group, value:
   * number of new messages in the group
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
                    if (seenlast.seenUsername ===
                    req.currentUser.currentUser.userName) {
                      userSeenLast.push(seenlast);
                    }
                  });
                  groupIds.forEach((groupId) => {
                    newMessages
                      .push(getNewMessages(groupId, messages, userSeenLast));
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

export default user;
