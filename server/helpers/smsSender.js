import Jusibe from 'node-jusibe';
import dotenv from 'dotenv';

dotenv.config();

const sendSms = (req, res, phoneNumber, message) => {
  const jusibeSDk = new Jusibe(process.env.JUSIBE_PUBLIC_KEY, process.env.JUSIBE_ACCESS_TOKEN);

  const params = {
    to: phoneNumber,
    from: 'PostIt',
    message
  };

  jusibeSDk.sendMessage(params)
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'sms has been sent'
      });
    })
    .catch(() => {
      res.status(403).json({
        success: false,
        message: 'An error occured while sending sms'
      });
    });
};
export default sendSms;
