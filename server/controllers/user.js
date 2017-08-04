import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
import isValidField from '../helpers/isValidField';

const groupMembers = db.User;

dotenv.load();
const secret = process.env.secretKey;
const User = db.User;
const message = db.Message;
const groups = db.Group;
const viewMessages = db.messageViewer;
/**
 * @param  {object} req
 * @param  {object} res
 * @description create a user with name, username, email and password.
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
        const token = jwt.sign(
          { user
          }, secret
        );
        res.status(201).json({
          success: true,
          message: 'Token generated successfully',
          Token: token
        });
      })
      .catch(error => res.status(400).send(error));
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
      .catch(error => res.status(400).send(error));
  },
  userGroups(req, res) {
    const list = [];
    groupMembers
      .findAll({ where: { memberId: req.params.userId } })
      .then((member) => {
        member.forEach((obj) => {
          list.push(obj.groupId);
        });
        groups
          .findAll({ where: { id: list } })
          .then(Groups => res.status(200).send(Groups))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(404).send(error));
  },
  updateUserInfo(req, res) {
    User.update({
      email: req.body.email,
      fullname: req.body.fullname,
      username: req.body.username,
      phoneNumber: req.body.phoneNumber
    }, {
      where: {
        id: req.decoded.user.id
      }
    }).then(() => {
      res.status(201).json({
        success: true,
        message: 'User info has been updated'
      });
    })
      .catch(error => res.status(401).send(error));
  },
  resetPassword(req, res) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    User.findOne({
      where: {
        id: req.decoded.user.id
      }
    }).then((user) => {
      if (oldPassword === user.password) {
        if (isValidField(newPassword)) {
          return res.status(403).json({
            success: false,
            message: 'This field is required'
          });
        } else if (req.body.newPassword.length < 9 || !(/[0-9]/.test(req.body.newPassword) && /[a-z A-Z]/.test(req.body.newPassword))) {
          return res.status(403).json({
            success: false,
            message: 'Weak password. Password should contain at least 8 characters including at least one number and alphabet'
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
          })
        })
      } else {
        return res.status(403).json({
          success: false,
          message: 'password does not match'
        });
      }
    })
      .catch(error => res.status(404).send(error));
  },
  userMessages(req, res) {
    User.findOne({
      where: {
        id: req.decoded.user.id
      }
    })
      .then((user) => {
        user.getMessages()
          .then(messages => res.status(200).send(messages))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(404).send(error));
  },
  userNotifications(req, res) {
    User.findOne({ where: {
      id: req.decoded.user.id
    } })
      .then((user) => {
        viewMessages
          .findOne({ where: {
            viewerUsername: req.decoded.user.username
          } })
          .then((viewers) => {
            if (viewers === null) {
              viewers = { seenMessageIds: [] };
            }
            user.getGroups()
              .then((Groups) => {
                const groupIds = [];
                Groups.forEach((group) => {
                  groupIds.push(group.id);
                });
                message
                  .findAll({ where: {
                    groupId: groupIds
                  } })
                  .then((messages) => {
                    let seenLast = 0;
                    let seenMessagesIds = [];
                    let hasSeenNotification = false;
                    const viewerData = [];
                    let viewerObject = { viewers: [] };
                    messages = messages.filter(Message =>
                      Message.senderId !== req.decoded.user.id
                    );
                    if (messages.length === viewers.seenMessageIds.length) {
                      hasSeenNotification = true;
                    } else {
                      messages = messages.filter((Message) => {
                        return !viewers.seenMessageIds.includes(Message.id);
                        seenLast = viewers.seenMessageIds.length;
                      });
                    }
                    messages.forEach((Message) => {
                      seenMessagesIds.push(Message.id);
                      viewMessages
                        .all()
                        .then((Viewers) => {
                          Viewers.forEach((viewer) => {
                            viewerObject.MessageId = Message.id;
                            if (viewer.seenMessageIds.includes(Message.id)) {
                              if (viewer.viewerUsername === req.decoded.user.username) {
                                viewerObject.viewers = viewerObject.viewers.concat('you');
                              } else {
                                viewerObject.viewers = viewerObject.viewers
                                  .concat(viewer.viewerUsername);
                              }
                            }
                          });
                          if (viewerObject.viewers.length > 0) {
                            viewerData.push(viewerObject);
                          }
                          viewerObject = { viewers: [] };
                        });
                    });
                    if (viewers.seenMessageIds.length === 0) {
                      viewMessages
                        .create({
                          viewerUsername: req.decoded.user.username,
                          seenMessageIds: seenMessagesIds
                        })
                        .then(() => {
                          res.status(200).json({
                            Messages: messages,
                            Viewers: viewerData,
                          });
                        })
                        .catch(error => res.status(407).send(error));
                    } else {
                      if (!hasSeenNotification) {
                        seenMessagesIds = viewers.seenMessageIds.concat(seenMessagesIds);
                      }
                      viewMessages
                        .update({
                          seenMessageIds: seenMessagesIds
                        }, {
                          where: {
                            viewerUsername: req.decoded.user.username
                          }
                        })
                        .then(() => {
                          res.status(200).json({
                            Messages: messages,
                            Viewers: viewerData,
                          });
                        })
                        .catch(error => res.status(407).send(error));
                    }
                  })
                  .catch(error => res.status(401).send(error));
              })
              .catch(error => res.status(403).send(error));
          })
          .catch(error => res.status(402).send(error));
      })
      .catch(error => res.status(404).send(error));
  }
};

export default createUser;
