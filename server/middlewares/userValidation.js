import db from '../models';
import isDigit from '../helpers/isDigit';
import isText from '../helpers/isText';
import isValidField from '../helpers/isValidField';

const User = db.User;
/**
   * @description validate inputs field for username, name, email and password
   * 
   * @param  {object} req
   * @param  {object} res
   * @param  {} next
   */
const userValidation = {
  basicValidation(req, res, next) {
    const error = {};
    const canVerify = {
      username: true,
      email: true,
      phoneNumber: true,
      fullname: true,
      password: true
    };
    if (isValidField(req.body.username)) {
      error.username = 'This field is required';
      canVerify.username = false;
    }
    if (isValidField(req.body.email)) {
      error.email = 'This field is required';
      canVerify.email = false;
    }
    if (isValidField(req.body.fullname)) {
      error.fullname = 'This field is required';
      canVerify.fullname = false;
    }
    if (isValidField(req.body.password)) {
      error.password = 'This field is required';
      canVerify.password = false;
    }
    if (isValidField(req.body.phoneNumber)) {
      error.phoneNumber = 'This field is required';
    }
    if (Object.keys(error).length === 5) {
      return res.status(400).json({
        error,
        success: false
      });
    }
    if (canVerify.email &&
     (req.body.email.slice(req.body.email.length - 4, req.body.email.length)
     !== '.com' || !(/[@]/.test(req.body.email)))) {
      canVerify.email = false;
      if (isValidField(error.email)) {
        error.email = 'Invalid email address';
      }
      if (Object.keys(error).length === 5) {
        return res.status(400).json({
          error,
          success: false
        });
      }
    }
    if (canVerify.fullname && (!isText(req.body.fullname)
     || req.body.fullname.length < 2)) {
      if (isValidField(error.fullname)) {
        error.fullname = `Name should contain alphabet and space
        alone and should contain at least 2 characters`;
      }
      if (Object.keys(error).length === 5) {
        return res.status(400).json({
          error,
          success: false
        });
      }
    }
    if (canVerify.username && (isDigit(req.body.username) ||
    isDigit(req.body.username[0]))) {
      canVerify.username = false;
      error.username = `Invalid username. username must
      contain an alphabet and must not begin with a number`;
      if (Object.keys(error).length === 5) {
        return res.status(400).json({
          error,
          success: false
        });
      }
    }
    if (canVerify.password && (req.body.password.length < 9 ||
    !(/[0-9]/.test(req.body.password) && /[a-z A-Z]/.test(req.body.password)))) {
      canVerify.password = false;
      if (isValidField(error.password)) {
        error.password = `Weak password. Password should contain 
        at least 8 characters including at least one number and alphabet`;
      }
      if (Object.keys(error).length === 5) {
        return res.status(400).json({
          error,
          success: false
        });
      }
    }
    if (Object.keys(error).length === 5) {
      return res.status(400).json({
        error,
        success: false
      });
    }
    let currentUsername = req.body.username;
    let currentEmail = req.body.email;
    let currentPhoneNumber = req.body.phoneNumber;
    if (req.body.username === null || req.body.username === undefined) {
      currentUsername = '';
    }
    if (req.body.username === null || req.body.username === undefined) {
      currentEmail = '';
    }
    if (req.body.phoneNumber === null || req.body.phoneNumber === undefined) {
      currentPhoneNumber = '';
    }

    User
      .findOne(
        {
          where: {
            username: currentUsername
          },
        })
      .then((users) => {
        if (users && isValidField(error.username)) {
          error.username = 'username already exist';
        }
        if (Object.keys(error).length === 5) {
          return res.status(400).json({
            error,
            success: false
          });
        }
        User
          .findOne(
            {
              where: {
                phoneNumber: currentPhoneNumber
              },
            })
          .then((phoneNumber) => {
            if (isValidField(error.phoneNumber) &&
             req.body.phoneNumber.length !== 11) {
              error.phoneNumber = 'Invalid phone number';
            }
            if (phoneNumber && isValidField(error.phoneNumber)) {
              error.phoneNumber = 'phone number already exist';
            }
            if (Object.keys(error).length === 5) {
              return res.status(400).json({
                error,
                success: false
              });
            }
            User
              .findOne(
                {
                  where: {
                    email: currentEmail
                  },
                })
              .then((email) => {
                if (!email && Object.keys(error).length === 0) {
                  return next();
                } else if (email && isValidField(error.email)) {
                  error.email = 'email already exist';
                }
                if (Object.keys(error).length > 0) {
                  return res.status(400).json({
                    error,
                    success: false
                  });
                }
                return next();
              })
              .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(401).send(err));
      })
      .catch(err => res.status(404).send(err));
  }
};

export default userValidation;
