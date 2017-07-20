import db from '../models';

const Message = db.Message;
/**
 * @param  {object} req request coming from the client
 * @param  {object} res response to the client
 * @description get all posts that belong to a specify group.
 * @return {object}
 */
const messages = {
  createMessage(req, res) {
    return Message
      .create({
        content: req.body.content,
        groupId: req.params.groupId,
        senderId: req.decoded.user.id,
        piority: req.body.piority
      })
      .then(() => {
        res.status(201).json({
          success: true,
          message: 'message sent successfully'
        });
      })
      .catch(error => res.status(400).send(error));
  }
};

export default messages;
