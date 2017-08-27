import nodemailer from 'nodemailer';
import db from '../models';
import getEmailsAndPhoneNumbers from './getEmailsAndPhoneNumber';
import dotenv from 'dotenv';
import smsSender from './smsSender';

dotenv.config();

const Group = db.Group;

const sendEmail = (req, res, next) => {
  if (req.body.priority === 'critical' || req.body.priority === 'urgent') {
    let recieverEmails;
    let receiverPhoneNumbers;
    const sender = req.currentUser.currentUser.username;
    let groupName;

    Group
      .findOne({
        where: {
          id: Number(req.params.groupId)
        }
      }).then((group) => {
        const message = `${req.currentUser.currentUser.username}
        just posted a message to ${groupName}`;
        groupName = group.name;
        group.getUsers()
          .then((users) => {
            recieverEmails = getEmailsAndPhoneNumbers(users)[0];
            if (req.body.priority === 'critical') {
              receiverPhoneNumbers = getEmailsAndPhoneNumbers(users)[1];
            }
            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'alienyidavid4christ@gmail.com',
                pass: "Davidwedomotola"
              }
            });
            //console.log(recieverEmails);
            const mailOptions = {
              from: `${sender} from ${groupName} <alienyidavid4christ@gmail.com>`, // sender address
              to: recieverEmails, // list of receivers
              subject: `PostIt: ${groupName}`, // Subject line
              html: `
          <a href="http://localhost">
          </a>
           <h3 style="margin-top: 40px; text-align: center">
           A member of PostIt
           <span style="color: rgba(203, 109, 81, 0.9)">${req.currentUser.currentUser.username}</span>,
            just posted a message to ${groupName}.<br><br>
              <a href="${req.body.url}">
                <div style="text-align: center">
                   <button style="background-color: red;
                    border: none; color: white; padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px; border-radius: 15px;">
                    CLICK HERE TO SEE THE MESSAGE
                   </button>
                 </div>
             </a> <br>
           </h2>
           `
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                res.status(403).json({ error: 'Could not send email' });
                next();
              } else {
                console.log(receiverPhoneNumbers);
                receiverPhoneNumbers.forEach((phoneNumber) => {
                  console.log(phoneNumber);
                  smsSender(message, phoneNumber);
                });
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
