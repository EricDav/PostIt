import db from '../models';
import isText from '../helpers/isText';
import isValidField from '../helpers/isValidField';

const User = db.User;

/** @class UpdateUser
 * @classdesc validate update user details field
 */
class UpdateUser {
  /**
   * constructor - contains the constructor
   * @param  {type} user the properties of the class UpdateUser
   * @return {void} no return or void
   */
  constructor(user) {
    this.error = {};
    this.user = user;
  }

  /**
 * @description checks for field that was updated
 * 
 * @param  {object} data user object
 * @return {array} returns an array of updated field
 */
  filterUserData(data) {
    const { fullname, email, phoneNumber } = this.user;
    const shouldUpdate = [];

    if (fullname !== null && fullname !== undefined && fullname !== data.fullname) {
      shouldUpdate.push([fullname, 1]);
    }
    if (email !== null && email !== undefined && email !== data.email) {
      shouldUpdate.push([email, 3]);
    }
    if (phoneNumber !== null && phoneNumber !== undefined && phoneNumber !== data.phoneNumber) {
      shouldUpdate.push([phoneNumber, 4]);
    }
    return shouldUpdate;
  }

  /** 
 * @description validate username field
 * 
 * @param  {string} fullname 
 * @return {string} return error message
 */
  validateFullname(fullname) {
    if (isValidField(fullname)) {
      this.error.fullname = 'This field is required';
    } else if (!isText(fullname) && fullname.length < 5) {
      this.error.fullname = `Name should contain alphabet and space 
      alone and should contain at least 5 characters`;
    }
  }

  /**
 * @description validate email field
 * 
 * @param  {string} email
 * @return {string} return error message
 */
  validateEmail(email) {
    if (isValidField(email)) {
      this.error.email = 'This field is required';
    } else if ((email.slice(email.length - 4, email.length)
     !== '.com' || !(/[@]/.test(email)))) {
      this.error.email = 'Invalid email';
    }
  }

  /**
 * @description validate phone number field
 * 
 * @param  {string} phoneNumber 
 * @return {string} return error message
 */
  validatePhoneNumber(phoneNumber) {
    if (isValidField(phoneNumber)) {
      this.error.phoneNumber = 'This field is required';
    } else if (phoneNumber.length !== 11) {
      this.error.phoneNumber = 'Invalid phone number';
    }
  }
}

/**
 * @description validate updated user information
 * 
 * @param  {string} req request object
 * @param  {string} res response object
 * @param  {string} next call back
 * @return {void} no returns
 */
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
    if (propertiesToUpdate.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not find change'
      });
    }
    const uniqueUpdates = [3, 4];
    propertiesToUpdate.forEach((property) => {
      if (property[1] === 1) {
        update.validateFullname(property[0]);
      } else if (property[1] === 3) {
        uniqueUpdates.pop();
        update.validateEmail(property[0]);
      } else if (property[1] === 4) {
        uniqueUpdates.pop();
        update.validatePhoneNumber(property[0]);
      }
    });
    const error = update.error;
    if (uniqueUpdates.length === 2) {
      return res.status(400).json({
        success: false,
        error
      });
    }
    User
      .all()
      .then((users) => {
        users.forEach((eachUser) => {
          uniqueUpdates.forEach((unique) => {
            if (unique === 3) {
              if (eachUser.email === req.body.email && eachUser.id !== req.currentUser.currentUser.id) {
                error.email = 'Email already exist';
              }
            } else if (unique === 4) {
              if (user.phoneNumber === req.body.phoneNumber
              && user.id !== req.currentUser.currentUser.id) {
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
