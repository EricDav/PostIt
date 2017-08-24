import db from '../models';
import isDigit from '../helpers/isDigit';
import isText from '../helpers/isText';
import isValidField from '../helpers/isValidField';

const User = db.User;
/**
   * @param  {object} req
   * @param  {object} res
   * @param  {} next
   * @description validate inputs field for username, name, email and password
   */
class UpdateUser {
  constructor(user) {
    this.error = {}
    this.user = user;
  }
  filterUserData(data){
    const { fullname, email, username, phoneNumber } = this.user;
    const shouldUpdate = [];

    if (fullname !== null && fullname !== undefined && fullname !== data.fullname) {
      shouldUpdate.push([fullname, 1]);
    }
    if (username !== null && username !== undefined && username !== data.username) {
      shouldUpdate.push([username, 2]);
    }
    if (email !== null && email !== undefined && email !== data.email) {
      shouldUpdate.push([email, 3]);
    }
    if (phoneNumber !== null && phoneNumber !== undefined && phoneNumber !== data.phoneNumber) {
      shouldUpdate.push([phoneNumber, 4]);
    }
    return shouldUpdate;
  }

  validateFullname(fullname) {
    if (isValidField(fullname)) {
      this.error.fullname = 'This field is required';
    } else if (!isText(fullname) && fullname.length < 5) {
      this.error.fullname = 'Name should contain alphabet and space alone and should contain at least 5 characters';
    }
  }
  validateUsername (username, res) {
    if (isValidField(username)) {
      this.error.username = 'This field is required';
    } else if (isDigit(username) ||
    isDigit(username[0]) || username.length < 3) {
      this.error.username = 'Username must contain an alphabet and must not begin with a number and must have up to 3 letters';
    }
  }
  validateEmail(email, res) {
    if (isValidField(email)) {
      this.error.email = 'This field is required';
    } else if ( (email.slice(email.length - 4, email.length)
     !== '.com' || !(/[@]/.test(email)))) {
      this.error.email = 'Invalid email';
    }
  }
  validatePhoneNumber(phoneNumber) {
    if (isValidField(phoneNumber)) {
      this.error.phoneNumber = 'This field is required';
    } else if (phoneNumber.length !== 11) {
      this.error.phoneNumber = 'Invalid phone number';
    }
  }
}
// updateUniqueValidation(req, res, next) {

// }

function validateUpdateUser(req, res, next) {
  const update = new UpdateUser(req.body);
  User.findOne({
    where: {
      id: req.currentUser.currentUser.id
    }
  }).then((user) => {
    if (!user) {
      return res.status(404).json({
        succesds: false,
        message: 'An unexpected error occured'
      });
    }
    const propertiesToUpdate = update.filterUserData(user);
    (propertiesToUpdate);
    if (propertiesToUpdate.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not find change'
      });
    }
    const uniqueUpdates = [2, 3, 4];
    propertiesToUpdate.forEach((property) => {
      if (property[1] === 1) {
        update.validateFullname(property[0]);
      } else if (property[1] === 2) {
        uniqueUpdates.pop(2);
        update.validateUsername(property[0]);
      } else if (property[1] === 3) {
        uniqueUpdates.pop(3);
        update.validateEmail(property[0]);
      } else if (property[1] === 4) {
        uniqueUpdates.pop(4);
        update.validatePhoneNumber(property[0]);
      }
    });
    const error = update.error;
    if (uniqueUpdates.length === 0) {
      return res.status(400).json({
        success: false,
        error
      });
    }
    User
      .all()
      .then((users) => {
        users.forEach((user) => {
          uniqueUpdates.forEach((unique) => {
            if (unique === 2) {
              if (user.username === req.body.username && user.id !== req.currentUser.currentUser.id) {
                error.username = 'Username already exist';
              }
            } else if (unique === 3) {
              if (user.email === req.body.email && user.id !== req.currentUser.currentUser.id) {
                error.email = 'Email already exist';
              }
            } else if (unique === 4) {
              if (user.phoneNumber === req.body.phoneNumber && user.id !== req.currentUser.currentUser.id) {
                error.phoneNumber = 'Phone number already exist';
              }
            }
          });
        });
        if (Object.keys(error).length === 0) {
          next();
        } else {
          return res.status(400).json({
            success: false,
            error
          });
        }
      })
      .catch(err => res.status(404).send(err));
  })
    .catch(error => res.status(404).send(error));
}
export default validateUpdateUser;
