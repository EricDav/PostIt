import Jusibe from 'node-jusibe';
import dotenv from 'dotenv';

dotenv.config();

const sendSms = (phoneNumber, message) => {
  const jusibeSDk = new Jusibe(process.env.JUSIBE_PUBLIC_KEY, process.env.JUSIBE_ACCESS_TOKEN);
  console.log(phoneNumber);
  const params = {
    to: phoneNumber,
    from: 'PostIt',
    message
  };

  jusibeSDk.sendMessage(params)
    .then((result) => {
      console.log(result, 'message sent successfully')
    })
    .catch(() => {
      console.log('An error occured');
    });
};
export default sendSms;
