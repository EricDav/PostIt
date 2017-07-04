import db from '../models';

const Groups = db.groups;
const groupMembers = db.groupMembers;
/**
 * @param  {object} req
 * @param  {object} res
 * @param  {} next
 * @description validate for group creation by checking in if group name exist
 * @return {object}
 */
const group = {
  groupValidation(req, res, next) {
    Groups
      .findOne({
        where: { Name: req.body.Name } })
      .then((Group) => {
        if (Group === null) {
          next();
        } else {
          return res.status(409).json({
            success: false,
            message: 'group name already exist'
          });
        }
      })
      .catch(error => res.status(404).send(error));
  },
  getGroupInformationValidation(req, res, next) {
    let check = false;
    return Groups
      .findOne({ where: { id: req.params.groupId } })
      .then((Group) => {
        if (!Group) {
          res.status(401).json({
            success: false,
            message: 'Group not found. Group  not created or has been deleted'
          });
        } else {
          groupMembers
            .findAll({ where: { groupId: req.params.groupId } })
            .then((members) => {
              check = false;
              members.forEach((member) => {
                if (member.memberId === Number(req.decoded.user.id)) {
                  check = true;
                }
              });
              if (!check) {
                res.status(401).json({
                  success: false,
                  message: 'You are not a member of this group, so you can not view group data'
                });
              }
            })
            .catch(error => res.status(404).send(error));
        }
        next();
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
