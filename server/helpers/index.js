import jwt from 'jsonwebtoken';
import winston from 'winston';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Jusibe from 'node-jusibe';

import dataBase from '../models/';

const Group = dataBase.Group;

dotenv.load();

/**
   * @description generate secret code to be sent to forgot password users
   * 
   * @return  {string} random secret code
*/

export const generateCode = () => {
  const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const alpha = ['a', 'B', 'c', 'D', 'e', 'F', 'g', 'H', 'i',
    'J', 'k', 'L', 'm',
    'N', 'o', 'P', 'q', 'R', 's', 'T', 'u', 'V', 'w', 'X', 'y', 'Z'];
  const char = ['@', '%', '?', '+', '-', '$', '#'];
  let secretCode = '';
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((num) => {
    if (num < 3 || num > 8) {
      secretCode = `${secretCode}${number[Math.floor(Math.random() * 10)]}`;
    } else if (num > 2 && num < 7) {
      secretCode = `${secretCode}${alpha[Math.floor(Math.random() * 26)]}`;
    } else {
      secretCode = `${secretCode}${char[Math.floor(Math.random() * 7)]}`;
    }
  });
  return secretCode;
};

export const removeCurrentUserFromSearchResult =
 (currentUser, searchedResult) => {
   const result = [];
   searchedResult.forEach((user) => {
     if (user.userName !== currentUser) {
       result.push(user);
     }
   });
   return result;
 };

export const isText = (str) => {
  if (str.length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i += 1) {
    if (/[a-z A-Z ' ']/.test(str[i]) === false) {
      return false;
    }
  }
  return true;
};

/**
 * @description checks if the string pass in is a digit. 
 * Means all the charcters are digit
 * 
 * @param  {string} str
 * @return {boolean} true or false
 */

export const isDigit = (str) => {
  const num = str.toString();
  if (num.length === 0) {
    return false;
  }
  for (let i = 0; i < num.length; i += 1) {
    if (/[0-9]/.test(num[i]) === false) {
      return false;
    }
  }
  return true;
};

/**
 *@description checks if a field is null, undefined or empty
 * 
 * @param  {type} fieldData
 * @return {boolean} true or false
 */

export const isInValidField = (fieldData) => {
  if (typeof (fieldData) !== 'string' || fieldData.length === 0) {
    return true;
  }
  let hasValue = false;
  fieldData.split().forEach((value) => {
    if (value !== ' ') {
      hasValue = true;
    }
  });
  if (!hasValue) {
    return true;
  }
  return false;
};

/**
 * @description removes password from user information
 * 
 * @param  {array} users array of users oject
 * @return {object} return array of users object without their password
 */

export const removePassword = (users) => {
  users.forEach((user) => {
    user.password = '';
  });
  return users;
};

/**
   * @description gnerate jwt token
   * 
   * @param  {object} currentUser userdetails to be encrypted
   * @param  {string} secret a secret key to be used to encrypt user details
*/

export const generateToken = (currentUser, secret) => {
  const token = jwt.sign(
    {
      currentUser,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    }, secret
  );
  return token;
};

/**
 * @description checks if the string pass in is a digit. Means all the charcters are digit
 * 
 * @param  {string} str
 * @return {boolean} true or false
 */

export const mailSender = (req, res, message,
  successMessage, secretCode, email) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'alienyidavid4christ@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: 'PostIt <alienyidavid4christ@gmail.com>',
    to: req.body.email,
    subject: 'PostIt',
    text: message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      winston.info(info);
      return res.status(500).json({
        success: false,
        message: 'An error occured'
      });
    }
    return res.status(200).json({
      success: true,
      message: successMessage,
      SwZ5: secretCode,
      email
    });
  });
};

/**
 * @description sends sms notification
 * 
 * @param  {string} phoneNumber
 * @param  {string} message
 * 
 * @return {boolean} true or false
 */
export const sendSms = (phoneNumber, message) => {
  const jusibeSDk = new Jusibe(process.env.JUSIBE_PUBLIC_KEY,
    process.env.JUSIBE_ACCESS_TOKEN);
  const params = {
    to: phoneNumber,
    from: 'PostIt',
    message
  };

  jusibeSDk.sendMessage(params)
    .then(result =>
      result
    )
    .catch(() => ({
      success: false,
      message: 'An error occured'
    })
    );
};

/**
 * @description gets the number of new messages in a particular group
 * 
 * @param  {integer} groupId 
 * @param  {array} messages 
 * @param  {integer} seenLasts the message seenLast
 * 
 * @return {object} numNewMessages number of new messages
 */
export const getNewMessages = (groupId, messages, seenLasts, userId) => {
  let numGroupMessages = 0;
  let numGroupSeenLast = 0;
  const numNewMessage = {};
  const groupMessages = [];
  messages.forEach((message) => {
    if (message.groupId === groupId) {
      groupMessages.push(message);
    }
  });
  seenLasts.forEach((seenLast) => {
    if (seenLast.groupId === groupId) {
      numGroupSeenLast = seenLast.seenLast;
    }
  });
  const newMessages = groupMessages
    .slice(numGroupSeenLast, messages.length - 1);
  newMessages.forEach((message) => {
    if (message.senderId !== userId) {
      numGroupMessages += 1;
    }
  });
  numNewMessage.groupId = groupId;
  numNewMessage.newMessage = numGroupMessages;
  return numNewMessage;
};

/**
 * @description get the emails and phone numbers from a user object
 * 
 * @param  {array} users
 * 
 * @return {void} no returns
 */
export const getEmailsAndPhoneNumbers = (users) => {
  let emails = '';
  const phoneNumbers = [];
  users.forEach((user) => {
    emails = `${emails},${user.email}`;
    phoneNumbers.push(user.phoneNumber);
  });
  return [emails, phoneNumbers];
};

/**
 * @description sends email and sms notification based on the message type
 * 
 * @param  {string} req request object
 * @param  {string} res response object
 * @param  {string} createdMessage user message
 * @return {void} does not return anything
 */
export const sendEmailAndSms = (req, res, createdMessage) => {
  let recieverEmails;
  let receiverPhoneNumbers;
  const sender = req.currentUser.currentUser.userName;
  let groupName;
  Group
    .findOne({
      where: {
        id: Number(req.params.groupId)
      }
    }).then((group) => {
      const message = `${req.currentUser.currentUser.userName}
         just posted a message to ${group.name} group`;
      groupName = group.name;
      group.getUsers()
        .then((users) => {
          recieverEmails = getEmailsAndPhoneNumbers(users)[0];
          if (req.body.priority === 'critical') {
            receiverPhoneNumbers = getEmailsAndPhoneNumbers(users)[1];
            receiverPhoneNumbers.forEach((phoneNumber) => {
              sendSms(phoneNumber, message);
            });
          }
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.GMAIL_PASSWORD
            }
          });
          const mailOptions = {
            from: `${sender} from ${groupName}
              <alienyidavid4christ@gmail.com>`,
            to: recieverEmails,
            subject: `PostIt: ${groupName}`,
            html: `
          <a href="http://localhost">
          </a>
           <h3 style="margin-top: 40px; text-align: center">
           A member of PostIt
           <span style="color: rgba(203, 109, 81, 0.9)">
           ${req.currentUser.currentUser.userName}</span>,
            just posted a message to ${groupName}.<br><br>
              <a href=${process.env.url}>
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
              return res.status(500).json({
                success: false,
                message: 'Could not send email'
              });
            }
            return res.status(201).json({
              success: true,
              message: createdMessage
            });
          });
        })
        .catch(() => res.status(400).send({
          success: false,
          message: 'server error'
        }));
    })
    .catch(() => res.status(401).send({
      success: false,
      message: 'Server error'
    }));
};
