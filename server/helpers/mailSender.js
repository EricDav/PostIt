import nodemailer from 'nodemailer';

const mailSender = (req, res, message, successMessage, secretCode, email) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'alienyidavid4christ@gmail.com',
      pass: 'Davidwedomotola'
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
