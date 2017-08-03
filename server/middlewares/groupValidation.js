import db from '../models';
import isText from '../helpers/isText';

const Groups = db.Group;
const User = db.User;
//const groupMembers = db.groupMembers;
/**
 * @param  {object} req
 * @param  {object} res
 * @param  {} next
 * @description validate for group creation by checking in if group name exist
 * @return {object}
 */
const group = {
  userValidation(req, res, next) {
    let check = true;
    Groups
      .findOne({
        where: { id: req.params.groupId } })
      .then((Group) => {
        Group.getUsers().then((users) => {
          users.forEach((element) => {
            if (element.id === Number(req.body.userId)) {
              check = false;
            }
          });
          if (check) {
            User.findOne({ where: {
              id: req.body.userId
            } })
              .then((user) => {
                if (!user) {
                  res.status(404).json({
                    success: false,
                    message: 'User does not exist'
                  });
                } else {
                  next();
                }
              });
          } else {
            return res.status(409).json({
              success: false,
              message: 'User already a member of the group'
            });
          }
        });
      })
      .catch(error => res.status(404).send(error));
  },
  groupValidation(req, res, next) {
    let check = false;
    return Groups
      .findOne({ where: { id: req.params.groupId } })
      .then((Group) => {
        if (!Group) {
          res.status(404).json({
            success: false,
            message: 'Group not found. Group  not created or has been deleted'
          });
        } else {
          Group.getUsers().then((users) => {
            users.forEach((element) => {
              if (element.id === req.decoded.user.id) {
                check = true;
              }
            });
            if (check) {
              next();
            } else {
              return res.status(401).json({
                success: false,
                message: 'Unathaurized: You are not a member of this group'
              });
            }
          });
        }
      })
      .catch(error => res.status(404).send(error));
  },
  groupNullValidation(req, res, next) {
    const nullValues = [];
    if (req.body.name === null || req.body.name === undefined) {
      nullValues.push('name');
    }
    if (req.body.description === null || req.body.description === undefined) {
      nullValues.push('description');
    }
    if (nullValues.length > 0) {
      if (nullValues.length === 1) {
        return res.status(400).json({
          success: false,
          message: `${nullValues[0]} can not be null: enter the value of ${nullValues[0]}`
        });
      }
      let Message = '';
      nullValues.forEach((elem, index) => {
        if (index === 0) {
          Message = `${Message} ${elem}`;
        } else {
          Message = `${Message}, ${elem}`;
        }
      });
      Message = `${Message}  can not be null: Enter the values of  ${Message}`;
      return res.status(400).json({
        success: false,
        message: Message
      });
    }
    if (req.body.description.length < 30) {
      return res.status(400).json({
        success: false,
        message: 'You must have a minimum of 30 characters in the description field'
      });
    }
    next();
  },
  deleteGroupValidation(req, res, next) {
    Groups
      .findOne({ where: { id: req.params.groupId } })
      .then((Group) => {
        if (!Group) {
          res.status(404).json({
            success: false,
            message: 'Group not found. Group does not exist or has been deleted'
          });
        } else if (Group.ownerUserName === req.decoded.user.userName) {
          next();
        } else {
          res.status(401).json({
            success: false,
            message: 'You are not authorized to delete this group'
          });
        }
      })
      .catch(error => res.status(404).send(error));
  }
};
export default group;
