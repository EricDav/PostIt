import db from '../models';
import isDigit from '../helpers/isDigit';
import isText from '../helpers/isText';

const User = db.PostIts;
const userValidation = {
  usernameValidation(req, res, next) {
    const nullValues = [];
    if (req.body.userName === null || req.body.userName === undefined) {
      nullValues.push('username');
    }
    if (req.body.email === null || req.body.email === undefined) {
      nullValues.push('email');
    }
    if (req.body.name === null || req.body.name === undefined) {
      nullValues.push('name');
    }
    if (req.body.password === null || req.body.password === undefined) {
      nullValues.push('password');
    }
    if (nullValues.length > 0) {
      if (nullValues.length === 1) {
        return res.status(404).json({ success: false, message: `${nullValues[0]} can not be null. Enter the value of ${nullValues[0]}` });
      }
      const nullVal = nullValues.join();
      return res.status(404).json({ success: false, message: `${nullVal} can not be null. Enter the values of  ${nullVal}` });
    } else if (req.body.email.slice(req.body.email.length - 4, req.body.email.length) !== '.com' || !(/[@]/.test(req.body.email))){
      if (req.body.email.slice(req.body.email.length - 4, req.body.email.length) !== '.com' &&
      /[@]/.test(req.body.email)) {
        return res.status(404).json({ success: false, message: 'Not a valid email address. can not find the extension /'.com / ' ' });
      } else if (!(/[@]/.test(req.body.email)) && (req.body.email.length - 4, req.body.email.length) === '.com') {
        return res.status(404).json({ success: false, message: 'Not a valid email address. can not find @ ' });
      }
      return res.status(404).json({ success: false, message: 'Not a valid email address. can not find the extension /'.com / ' and can not find @ ' });
    } else if (!isText(req.body.name)) {
      return res.status(404).json({ success: false, message: 'Invalid name. Name should contain alphabet and space alone. ' });
    } else if (isDigit(req.body.userName) || isDigit(req.body.userName[0])) {
      if (isDigit(req.body.userName)) {
        return res.status(404).json({ success: false, message: 'Invalid username. username must contain an alphabet' });
      }
      return res.status(404).json({ success: false, message: 'Invalid username. You can only start a username with an alphabet' });
    }
    User
      .findOne(
        {
          where: {
            userName: req.body.userName
          },
        })
      .then((user) => {
        if (!user) {
          next();
        } else {
          return res.status(409).json({
            success: false,
            message: 'username already exist'
          });
        }
      })
      .catch(error => res.status(404).send(error));
  },
  emailValidation(req, res, next) {
    User
      .findOne(
        {
          where: {
            email: req.body.email
          },
        })
      .then((user) => {
        if (!user) {
          next();
        } else {
          return res.status(409).json({
            success: false,
            message: 'email already exist'
          });
        }
      })
      .catch(error => res.status(404).send(error));
  }
};
export default userValidation;
