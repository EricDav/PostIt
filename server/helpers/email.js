import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import winston from 'winston';

import db from '../models';
import getEmailsAndPhoneNumbers from './getEmailsAndPhoneNumber';
import smsSender from './smsSender';

dotenv.config();

const Group = db.Group;

/**
 * @param  {string} req request object
 * @param  {string} res response object
 * @param  {string} next call back
 * @description sends email and sms notification based on the message type
 * @return {void} no returns
 */
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
         just posted a message to ${group.name} group`;
        groupName = group.name;
        group.getUsers()
          .then((users) => {
            recieverEmails = getEmailsAndPhoneNumbers(users)[0];
            if (req.body.priority === 'critical') {
              receiverPhoneNumbers = getEmailsAndPhoneNumbers(users)[1];
              receiverPhoneNumbers.forEach((phoneNumber) => {
                smsSender(phoneNumber, message);
              });
            }
            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'alienyidavid4christ@gmail.com',
                pass: process.env.GMAIL_PASSWORD
              }
            });
            const mailOptions = {
              from: `${sender} from ${groupName} <alienyidavid4christ@gmail.com>`, // sender address
              to: recieverEmails, // list of receivers
              subject: `PostIt: ${groupName}`, // Subject line
              html: `
          <a href="http://localhost">
          </a>
           <h3 style="margin-top: 40px; text-align: center">
           A member of PostIt
           <span style="color: rgba(203, 109, 81, 0.9)">
           ${req.currentUser.currentUser.username}</span>,
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
                winston.info(info);
                return res.status(403).json({ error: 'Could not send email' });
              }
              next();
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
