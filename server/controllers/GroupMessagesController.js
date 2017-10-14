import dataBase from '../models';
import { sendEmailAndSms, isDigit, getNewMessages } from '../helpers/index';

const messageModel = dataBase.Message;
const viewMessagesModel = dataBase.MessageViewer;
const seenLastModel = dataBase.SeenLast;
const userModel = dataBase.User;

const GroupMessagesController = {
  /**
 *@description create a message through the route
* POST: /api/v1/groups/:groupId/message'
 * 
 * @param  {object} req request object
 * @param  {object} res response object
 * 
 * @return {object} response containing the created message
 */
  createMessage(req, res) {
    if (!isDigit(req.params.groupId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid groupId'
      });
    }
    return messageModel
      .create({
        content: req.body.content,
        groupId: req.params.groupId,
        senderId: req.currentUser.currentUser.id,
        senderUsername: req.currentUser.currentUser.userName,
        priority: req.body.priority
      })
      .then((createdMessage) => {
        if (req.body.priority !== 'normal') {
          sendEmailAndSms(req, res, createdMessage);
        } else {
          res.status(201).json({
            success: true,
            message: createdMessage
          });
        }
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   *@description fetches all the messages for a particular group through
   * GET: /api/v1/groups/:groupId/messages
   * 
   * @param  {object} req  request object
   * @param  {object} res  response object
   * 
   * @return {array} array of object
   */
  getMessages(req, res) {
    if (!isDigit(req.params.groupId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid groupId'
      });
    }
    return messageModel
      .findAll({ where: {
        groupId: req.params.groupId
      } })
      .then((messages) => {
        if (messages.lenght === 0) {
          res.status(200).json({
            message: 'This group has no message'
          });
        } else {
          res.status(200).send(messages);
        }
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },
  /**
   * @description fetch all the messages and their viewers thnrough
   * GET: /api/v1/groups/:groupId/message/viewers
   * 
   * @param  {object} request object
   * @param  {object} response object
   * 
   * @return {object} response containing action details
   */

  getMessagesWithSeenUsers(req, res) {
    let allViewMessages = [];
    let viewerObject = { viewers: [] };
    const viewerData = [];
    seenLastModel.findOne({
      where: {
        seenUsername: req.currentUser.currentUser.userName,
        groupId: req.params.groupId
      }
    })
      .then((viewer) => {
        if (viewer === null) {
          viewer = { seenLast: 0 };
          seenLastModel.create({
            seenUsername: req.currentUser.currentUser.userName,
            groupId: req.params.groupId,
            seenLast: 0
          })
            .catch(() => res.status(500).json({
              success: false,
              message: 'Server error'
            }));
        }
        viewMessagesModel.all()
          .then((viewers) => {
            if (!viewers) {
              allViewMessages = [];
            } else {
              allViewMessages = viewers;
            }
          });
        messageModel
          .findAll({
            where: {
              groupId: req.params.groupId
            }
          }).then((messages) => {
            messages.forEach((message) => {
              allViewMessages.forEach((messageViewer) => {
                if (messageViewer.seenMessageIds.includes(message.id)) {
                  viewerObject.viewers.push(messageViewer.viewerUsername);
                }
              });
              viewerObject.message = message;
              viewerData.push(viewerObject);
              viewerObject = { viewers: [] };
            });
            return res.status(200).json({
              success: true,
              data: viewerData,
              seenLast: viewer.seenLast
            });
          });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },
  /**
   * @description update the messages that have been seen by a user through
   * PUT: /api/v1/groups/:groupId/updateSeenMessages
   * 
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return {object} 
   */

  updateSeenMessages(req, res) {
    viewMessagesModel.findOne({
      where: {
        viewerUsername: req.currentUser.currentUser.userName
      }
    })
      .then((viewer) => {
        if (!viewer) {
          viewMessagesModel.create({
            viewerUsername: req.currentUser.currentUser.userName,
            seenMessageIds: req.body.seenMessageIds,
          })
            .then((view) => {
              seenLastModel.update({
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
          viewMessagesModel.update({
            seenMessageIds: req.body.seenMessageIds
          }, {
            where: {
              viewerUsername: req.currentUser.currentUser.userName
            }
          })
            .then(() => {
              seenLastModel.update({
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
                });
            });
        }
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   *  @description It gets all the numbers of
   * new messages in all the groups a user belongs to
   * 
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return {object} response containing the number of new messages
   */
  getMessageNotifications(req, res) {
    userModel.findOne({
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
          messageModel.findAll({
            where: {
              groupId: groupIds
            }
          })
            .then((messages) => {
              seenLastModel.findAll({
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
                      .push(getNewMessages(groupId, messages, userSeenLast,
                        req.currentUser.currentUser.id));
                  });
                  return res.status(200).send(newMessages);
                });
            });
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },
};

export default GroupMessagesController;
