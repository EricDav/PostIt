import db from '../models';

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
