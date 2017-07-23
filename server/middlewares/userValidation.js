import db from '../models';
import isDigit from '../helpers/isDigit';
import isText from '../helpers/isText';

const User = db.User;
/**
   * @param  {object} req
   * @param  {object} res
   * @param  {} next
   * @description validate inputs field for username, name, email and password
   */
const userValidation = {
  basicValidation(req, res, next) {
    const nullValues = [];
    if (req.body.username === null || req.body.username === undefined) {
      nullValues.push('username');
    }
    if (req.body.email === null || req.body.email === undefined) {
      nullValues.push('email');
    }
    if (req.body.fullname === null || req.body.fullname === undefined) {
      nullValues.push('name');
    }
    if (req.body.password === null || req.body.password === undefined) {
      nullValues.push('password');
    }
    if (req.body.phoneNumber === null || req.body.phoneNumber === undefined){
      nullValues.push('phoneNumber');
    }
    if (nullValues.length > 0) {
      if (nullValues.length === 1) {
        return res.status(404).json({ success: false, message: `${nullValues[0]} can not be null. Enter the value of ${nullValues[0]}` });
      }
      const nullVal = nullValues.join();
      return res.status(404).json({ success: false, message: `${nullVal} can not be null. Enter the values of  ${nullVal}` });
    } else if (req.body.email.slice(req.body.email.length - 4, req.body.email.length) !== '.com' || !(/[@]/.test(req.body.email))) {
      if (req.body.email.slice(req.body.email.length - 4, req.body.email.length) !== '.com' &&
      /[@]/.test(req.body.email)) {
        return res.status(404).json({ success: false, message: 'Not a valid email address. can not find the extension .com ' });
      } else if (!(/[@]/.test(req.body.email)) && (req.body.email.length - 4, req.body.email.length) === '.com') {
        return res.status(404).json({ success: false, message: 'Not a valid email address. can not find @ ' });
      }
      return res.status(404).json({ success: false, message: 'Not a valid email address. can not find the extension /'.com / ' and can not find @ ' });
    } else if (!isText(req.body.fullname)) {
      return res.status(404).json({ success: false, message: 'Invalid name. Name should contain alphabet and space alone. ' });
    } else if (isDigit(req.body.username) || isDigit(req.body.username[0])) {
      if (isDigit(req.body.username)) {
        return res.status(404).json({ success: false, message: 'Invalid username. username must contain an alphabet' });
      }
      return res.status(404).json({ success: false, message: 'Invalid username. You can only start a username with an alphabet' });
    } else if (req.body.password.length < 9 || !(/[0-9]/.test(req.body.password) && /[a-z A-Z]/.test(req.body.password))) {
      return res.status(404).json({ success: false, message: 'Weak password. Password should contain at least 8 characters including at least one number and alphabet' });
    }

    User
      .findOne(
        {
          where: {
            username: req.body.username
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
      .catch(error => res.status(401).send(error));
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
  },
  phoneNumberValidation(req, res, next) {
    User
      .findOne(
        {
          where: {
            phoneNumber: req.body.phoneNumber
          }
        }
      )
      .then((phoneNumber) => {
        if (req.body.phoneNumber.length !== 11 || !isDigit(req.body.phoneNumber)) {
          res.status(400).json({
            success: false,
            message: 'Invalid phone number'
          });
        } else if (!phoneNumber) {
          next();
        } else {
          return res.status(409).json({
            success: false,
            message: 'phone number already exist'
          });
        }
      });
  }
};
export default userValidation;
