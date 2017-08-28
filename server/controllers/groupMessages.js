import db from '../models';

const Message = db.Message;
/**
 * @param  {object} req request coming from the client
 * @param  {object} res response to the client
 * @description construct a message with the appriopriate field
 * @return {void} no returns
 */
const Messages = {
  createMessage(req, res) {
    return Message
      .create({
        content: req.body.content,
        groupId: req.params.groupId,
        senderId: req.currentUser.currentUser.id,
        senderUsername: req.currentUser.currentUser.username,
        priority: req.body.priority
      })
      .then(() => {
        res.status(201).send('i am here');
      })
      .catch(error => res.status(400).send(error));
  },

  /**
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @description fetches all the messages for a particular group
   * @return {array} array of object
   */
  getMessages(req, res) {
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
      .catch(error => res.status(404).send(error));
  }
};

export default Messages;
