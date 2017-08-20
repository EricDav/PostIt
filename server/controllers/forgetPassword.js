import db from '../models';
import generateCode from '../helpers/generateVerificationToken';
import mailSender from '../helpers/mailSender';


const User = db.User;
const forgotPassword = db.forgotPassword;

const forgetPassword = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }
      const generatedNumber = generateCode();
      const message = 'Your verification code is:';
      forgotPassword.create({
        user: user.username,
        generatedNumber,
        verified: false
      }).then((Users) => {
        if (!Users) {
          res.status(500).json({
            success: false,
            message: 'An unexpected error occured'
          });
        }
        mailSender(req, res, message);
      })
        .catch(error => res.status(402).send(error));
    })
    .catch(error => res.status(403).send(error));
};

export default forgetPassword;