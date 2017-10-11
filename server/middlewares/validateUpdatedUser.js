import db from '../models';
import UpdateUserInfoValidator from './UpdateUserInfoValidator';

const User = db.User;

/**
 * @description validate updated user information
 * 
 * @param  {string} req request object
 * @param  {string} res response object
 * @param  {string} next call back
 * @return {void} no returns
 */
const validateUpdatedUser = (req, res, next) => {
  const update = new UpdateUserInfoValidator(req.body);
  User.findOne({
    where: {
      id: req.currentUser.currentUser.id
    }
  }).then((user) => {
    if (!user) {
      return res.status(404).json({
        success: false,
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
    if (uniqueUpdates.length === 2 && error.fullName) {
      return res.status(400).json({
        success: false,
        error
      });
    } else if (uniqueUpdates.length === 2 && !error.fullName) {
      return next();
    }
    User
      .all()
      .then((users) => {
        users.forEach((eachUser) => {
          uniqueUpdates.forEach((unique) => {
            if (unique === 3) {
              if (eachUser.email === req.body.email && eachUser.id
              !== req.currentUser.currentUser.id) {
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
      .catch(err => res.status(400).send(err));
  })
    .catch(error => res.status(401).send(error));
};

export default validateUpdatedUser;
