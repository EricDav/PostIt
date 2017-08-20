import db from '../models';
import { Message, AddUser } from '../helpers/notificationMessages';

const Notification = db.Notification;

const messageNotification = (req, res, next) => {
  let message;
  if (req.body.type === 1) {
    message = Message;
  } else if (req.body.type.toString() === '2') {
    message = AddUser;
  }
  return Notification.create({
    groupId: req.params.groupId,
    senderUsername: req.currentUser.currentUser.username,
    message: `${req.currentUser.currentUser.username}  ${message} to ${req.body.groupName}`,
    seen: []
  }).then(() => {
    next();
  })
    .catch(error => res.status(403).send(error));
};

const getNotification = (req, res) => {
  Notification.findAll({
    where: {
      groupId: req.body.groupIds,
    }
  }).then((notifications) => {
    if (!notifications) {
      res.status(404).json({
        success: false,
        message: 'Could not find notifications'
      }); 
    } else {
      res.status(200).send(notifications);
    }
  })
    .catch(error => res.status(400).send(error));
};

// const updateNotification = (req, res) => {
//   Notification.update({
//     seen: req.body.
//   })
//     .then(() => {
//       res.status(201).json({
//         sucess: true,
//         message: 'notification updated successfully'
//       });
//     })
//     .catch(error => res.status(400).send(error));
// };


export default { messageNotification,
  getNotification
  // updateNotification
};
