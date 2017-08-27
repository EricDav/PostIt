import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
import isValidField from '../helpers/isValidField';
import getNewMessages from '../helpers/getNewMessages';

const groupMembers = db.User;

dotenv.load();
const secret = process.env.secretKey;
const User = db.User;
const message = db.Message;
const groups = db.Group;
const viewMessages = db.messageViewer;
const seenLast = db.SeenLast;
/**
 * @param  {object} req
 * @param  {object} res
 * @description create a user with name, username, email, phone number and password.
 */
const createUser = {
  create(req, res) {
    return User
      .create({
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        active: true
      })
      .then((user) => {
        const currentUser = { username: user.username,
          fullname: user.fullname,
          id: user.id,
          email: user.email,
          phoneNumber: user.phoneNumber,
        };
        const token = jwt.sign(
          { currentUser,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
          }, secret
        );
        return res.status(201).json({
          success: true,
          message: 'Token generated successfully',
          Token: token
        });
      })
      .catch(error => res.status(500).send(error));
  },

  /**
   * @param  {object} req
   * @param  {object} res
   * @description fetch all the users from database
   * @return {array} all users in an array
   */
  allUsers(req, res) {
    return User
      .all()
      .then(user => res.status(201).send(user))
      .catch(error => res.status(500).send(error));
  },

  /**
   * @param  {object} req
   * @param  {object} res
   * @description update user uptable details like fullname, email and phone number
   */

  updateUserInfo(req, res) {
    User.update({
      email: req.body.email,
      fullname: req.body.fullname,
      phoneNumber: req.body.phoneNumber
    }, {
      where: {
        id: req.currentUser.currentUser.id
      }
    }).then(() => {
      return res.status(201).json({
        success: true,
        message: 'User info has been updated'
      });
    })
      .catch(error => res.status(401).send(error));
  },

  /**
   * @param  {object} req
   * @param  {object} res
   * @description reset users password given the user provide the initial password
   */

  resetPassword(req, res) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    User.findOne({
      where: {
        id: req.currentUser.currentUser.id
      }
    }).then((user) => {
      if (oldPassword === user.password) {
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
        } else if(!/[a-z A-Z]/.test(req.body.newPassword)) {
          return res.status(400).json({
            success: false,
            message: 'Password should contain at least one number'
          });
        }
        User.update({
          password: newPassword
        }, {
          where: {
            id: user.id
          }
        }).then(() => {
          return res.status(201).json({
            success: true,
            message: 'Password has been reset'
          });
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid old password'
        });
      }
    })
      .catch(error => res.status(500).send(error));
  },

/**
   * @param  {object} req
   * @param  {object} res
   * @description fetch all the messages and those that has seen 
   * @description  them from a specific group the current users belongs to.
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
   * @param  {object} req
   * @param  {object} res
   * @description update the messages that have been seen by a user
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
                .catch(error => res.status(402).send(error));
            })
            .catch(error => res.status(403).send(error));
        }
      })
      .catch(error => res.status(405).send(error));
  },
  getMessages(req, res) {
    User.findOne({
      where: {
        id: req.currentUser.currentUser.id
      }
    })
      .then((user) => {
        user.getGroups().then((Groups) => {
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
                  })
                  groupIds.forEach((groupId) => {
                    newMessages.push(getNewMessages(groupId, messages, userSeenLast));
                  });
                  return res.status(200).send(newMessages);
                })
                .catch(error => res.status(405).send(error));
            })
            .catch(error => res.status(405).send(error));
        })
          .catch(error => res.status(405).send(error));
      })
      .catch(error => res.status(405).send(error));
  },
  getUser(req, res) {
    User.findOne({
      where: {
        id: req.currentUser.currentUser.id
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User does not exist'
          });
        } else if (Number(user.id) !== Number(req.currentUser.currentUser.id)) {
          console.log(user.id, req.currentUser.currentUser.id);
          return res.status(400).json({
            success: false,
            message: 'You are not Authorize for this operation'
          });
        }
        const userInfo = {
          id: user.id,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          fullname: user.fullname
        };
        return res.status(200).json({
          success: true,
          user: userInfo
        });
      });
  }
};

export default createUser;
