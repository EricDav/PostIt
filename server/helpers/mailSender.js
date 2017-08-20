import nodemailer from 'nodemailer';

const mailSender = (req, res, message) => {
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
      res.status(403).json({ error: 'Something bad happened' });
    } else {
      res.status(200).json({
        success: true,
        message: 'email sent successfully'
      });
    }
  });
};

export default mailSender;
