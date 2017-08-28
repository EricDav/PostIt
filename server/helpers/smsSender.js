import Jusibe from 'node-jusibe';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @param  {string} phoneNumber
 * @param  {string} message
 * @description sends sms notification
 * @return {boolean} true or false
 */
const sendSms = (phoneNumber, message) => {
  const jusibeSDk = new Jusibe(process.env.JUSIBE_PUBLIC_KEY, process.env.JUSIBE_ACCESS_TOKEN);
  const params = {
    to: phoneNumber,
    from: 'PostIt',
    message
  };

  jusibeSDk.sendMessage(params)
    .then(result =>
      result
    )
    .catch(() => 'An error occured'
    );
};
export default sendSms;
