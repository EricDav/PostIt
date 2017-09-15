import jwt from 'jsonwebtoken';
import winston from 'winston';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Jusibe from 'node-jusibe';

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
  if (str.length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i += 1) {
    if (/[0-9]/.test(str[i]) === false) {
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

export const genToken = (currentUser, secret) => {
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
    .catch(err => err
    );
};

/**
 * @description gets the number of new messages in a particular group
 * 
 * @param  {integer} groupId 
 * @param  {array} messages 
 * @param  {integer} seenLasts the message seenLast
 * @return {object} numNewMessages number of new messages
 */
export const getNewMessages = (groupId, messages, seenLasts) => {
  let numGroupMessages = 0;
  let numGroupSeenLast = 0;
  const numNewMessage = {};
  messages.forEach((message) => {
    if (message.groupId === groupId) {
      numGroupMessages += 1;
    }
  });
  seenLasts.forEach((seenLast) => {
    if (seenLast.groupId === groupId) {
      numGroupSeenLast = seenLast.seenLast;
    }
  });
  numNewMessage.groupId = groupId;
  numNewMessage.newMessage = numGroupMessages - numGroupSeenLast;
  return numNewMessage;
};

/**
 * @description get the emails and phone numbers from a user object
 * 
 * @param  {array} users 
 * @return {void} no returns
 */
export const getEmailsAndPhoneNumber = (users) => {
  let emails = '';
  const phoneNumbers = [];
  users.forEach((user) => {
    emails = `${user.email}`;
    phoneNumbers.push(user.phoneNumber);
  });
  return [emails, phoneNumbers];
};
