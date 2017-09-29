import dataBase from '../models';
import { sendEmailAndSms, isDigit } from '../helpers/index';

const Message = dataBase.Message;
/**
 *@description construct a message with the appriopriate field
 * 
 * @param  {object} req request coming from the client
 * @param  {object} res response to the client
 * 
 * @return {void} no returns
 */
const Messages = {
  createMessage(req, res) {
    if (!isDigit(req.params.groupId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid groupId'
      });
    }
    return Message
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
   *@description fetches all the messages for a particular group
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
    return Message
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
      .catch(() => res.status(404).json({
        success: false,
        message: 'Server error'
      }));
  }
};

export default Messages;
