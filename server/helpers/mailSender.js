import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();

/**
 * @param  {string} str
 * @description checks if the string pass in is a digit. Means all the charcters are digit
 * @return {boolean} true or false
 */

const mailSender = (req, res, message, successMessage, secretCode, email) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'alienyidavid4christ@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: 'PostIt <alienyidavid4christ@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'PostIt', // Subject line
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

export default mailSender;
