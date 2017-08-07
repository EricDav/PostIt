import nodemailer from 'nodemailer';
import db from '../models';
import getEmailsFromUsers from './getEmails';

const Group = db.Group;

const sendEmail = (req, res, next) => {
  if (req.body.piority === 'critical' || req.body.piority === 'urgent') {
    const message = req.body.content;
    let recieverEmails;
    const sender = req.currentUser.currentUser.username;
    let groupName;

    Group
      .findOne({
        where: {
          id: Number(req.params.groupId)
        }
      }).then((group) => {
        groupName = group.name;
        group.getUsers()
          .then((users) => {
            recieverEmails = getEmailsFromUsers(users);
            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'alienyidavid4christ@gmail.com',
                pass: 'Davidwedomotola'
              }
            });
            const mailOptions = {
              from: `${sender} from ${groupName} <alienyidavid4christ@gmail.com>`, // sender address
              to: recieverEmails, // list of receivers
              subject: `PostIt: ${groupName}`, // Subject line
              text: message
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.status(403).json({ error: 'Something bad happened' });
              } else {
                next();
              }
            });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  } else {
    next();
  }
};

export default sendEmail;
