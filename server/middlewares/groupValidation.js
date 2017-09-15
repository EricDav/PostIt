import db from '../models';
import { isInValidField } from '../helpers/index';

const Groups = db.Group;
const User = db.User;

/**
 * @description group validation. validate for adding members to group
 * 
 * @param  {object} req
 * @param  {object} res
 * @param  {type} next call back function
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

  /**
    * @description validate for obtaining a group information
    * 
    * @param  {object} req
    * @param  {object} res
    * @param  {type} next call back function
    * @return {null} no return
 */
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
              if (element.id === req.currentUser.currentUser.id) {
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

  /**
    * @description validate for creating a group
    *
    * @param  {object} req
    * @param  {object} res
    * @param  {type} next call back function
    * @return {voud} no returns
 */
  groupNullValidation(req, res, next) {
    const nullValues = { name: '', description: '' };
    if (isInValidField(req.body.name)) {
      nullValues.name = 'This field is required';
    }
    if (isInValidField(req.body.description) || nullValues.description === null
    || nullValues.description === undefined) {
      nullValues.description = 'This field is required';
    }
    if (nullValues.description !== '' && req.body.description !== null
     && req.body.description !== undefined) {
      if (req.body.description.length < 20) {
        nullValues.description = 'You need to have up to 20 charecters';
      }
    }
    Groups.findOne({
      where: {
        name: req.body.name
      }
    }).then((groups) => {
      if (groups) {
        if (nullValues.name === '') {
          nullValues.name = 'Group title already exist';
        }
        return res.status(409).send(nullValues);
      } else if (nullValues.name === '' && nullValues.description === '') {
        next();
      } else {
        return res.status(405).send(nullValues);
      }
    });
  },

  /**
 * @description validate for group deletion. make sure that 
 * it is the correct user have the license to delete a group
 * 
 * @param  {object} req
 * @param  {object} res
 * @param  {type} next call back function
 * @return {void}
 */
  deleteGroupValidation(req, res, next) {
    if (req.params.groupId === null || req.params.groupId === undefined ||
    req.params.groupId === 'undefined') {
      return res.status(400).json({
        success: false,
        message: 'Invalid group id'
      });
    }
    Groups
      .findOne({ where: { id: req.params.groupId } })
      .then((Group) => {
        if (!Group) {
          res.status(404).json({
            success: false,
            message: 'Group not found. Group does not exist or has been deleted'
          });
        } else if (Group.creator === req.currentUser.currentUser.userName) {
          next();
        } else {
          res.status(401).json({
            success: false,
            message: 'You are not authorized to delete this group'
          });
        }
      })
      .catch(error => res.status(404).send(error));
  },

  /**
 *@description validate for deleting a user from a group
 *
 * @param  {object} req
 * @param  {object} res
 * @param  {type} next call back function
 * @return {void}
 */
  deleteUserFromGroupValidation(req, res, next) {
    Groups.findOne({
      where: {
        id: req.params.groupId,
      }
    })
      .then((group2) => {
        if (!group2) {
          res.status(404).json({
            success: false,
            message: 'Group does not exist'
          });
        } else {
          User.findOne({
            where: {
              id: req.params.userId
            }
          })
            .then((user) => {
              if (!user) {
                res.status(404).json({
                  success: false,
                  message: 'User does not exist'
                });
              } else if (req.currentUser.currentUser.userName
                === group.creator ||
                 req.currentUser.currentUser.userName === user.userName) {
                next();
              } else {
                res.status(401).json({
                  success: false,
                  message: 'You are not permited to perform this operation'
                });
              }
            })
            .catch(() => res.status(500).json({
              success: false,
              message: 'Server error'
            }));
        }
      })
      .catch(error => res.status(404).send(error));
  },
};
export default group;
