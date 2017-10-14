import dataBase from '../models';
import { removePassword, isDigit } from '../helpers/index';

const Group = dataBase.Group;
const User = dataBase.User;
const Members = dataBase.UserGroup;


const GroupController = {
  /**
 * @description creates a group through the route POST: api/v1/group
 * 
 * @param  {object} req request request object
 * @param  {object} res response response object
 * 
 * @return {object} response containing the created group
 */
  create(req, res) {
    Group
      .create({
        name: req.body.name,
        description: req.body.description,
        creator: req.currentUser.currentUser.userName
      })
      .then((createdGroup) => {
        createdGroup.addUser(req.currentUser.currentUser.id);
        res.status(201).json({
          success: true,
          group: createdGroup
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  addUser(req, res) {
    return Group
      .findOne({ where: {
        id: req.params.groupId
      } })
      .then((userGroup) => {
        userGroup.addUser(req.body.userId).then(() => {
          User.findOne({
            where: {
              id: req.body.userId
            }
          })
            .then((addedUser) => {
              res.status(201).json({
                success: true,
                user: addedUser
              });
            });
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   *@description fetches all the group through the route GET: api/v1/groups
   *
   * @param  {object} request object 
   * @param  {object} response object
   * 
   * @return {object} response containing the retrieved groups
   */

  getGroups(req, res) {
    if (typeof Number(req.query.offset) !== 'number'
     && typeof Number(req.query.limit) !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Offset or limit must be an integer'
      });
    }
    User
      .findOne({ where: {
        id: req.currentUser.currentUser.id
      } })
      .then((user) => {
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 10;
        const order = [['createdAt', 'DESC']];
        user.getGroups({ offset, limit, order }).then((groups) => {
          if (groups.length === 0) {
            res.status(200).json({
              groups: [],
              message: 'You did not belong to any group'
            });
          } else {
            res.status(200).json({
              groups
            });
          }
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   * @description retrieve all the members through the route
   * GET: /api/v1/groups/:groupId/members
   * 
   * @param  {object} req request object
   * @param  {object} res response object
   * 
   * @return {object} response containing the retrieved group members
   */
  getGroupMembers(req, res) {
    if (!isDigit(req.params.groupId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid groupId'
      });
    }
    return Group
      .findOne({ where: {
        id: req.params.groupId
      } })
      .then((userGroup) => {
        userGroup.getUsers()
          .then(groupMembers => res.status(200)
            .send(removePassword(groupMembers)))
          .catch(() => res.status(500).json({
            success: false,
            message: 'Server error'
          }));
      });
  },

  /**
   * @description delete a member of a group through the route
   * DELETE: /api/v1/groups/:groupId/delete
   * 
   * @param  {object} req  request object
   * @param  {object} res  response object
   * 
   * @return {object} rsponse containing the status of the action
   */
  deleteGroup(req, res) {
    if (!isDigit(req.params.groupId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid groupId'
      });
    }
    Group.destroy({
      where: {
        id: req.params.groupId
      }
    })
      .then((deletedGroup) => {
        Members.destroy({
          where: {
            groupId: req.params.groupId
          }
        })
          .then(() => {
            res.status(200).json({
              success: true,
              deletedGroup,
              message: 'group deleted successfully'
            });
          })
          .catch(() => res.status(500).send({
            success: false,
            message: 'Server error'
          }));
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   * @description delete a member of a group through the route
   * DELETE: /api/v1/groups/:groupId/users/:userId/delete
   * 
   * @param  {object} req  request object
   * @param  {object} res  response object
   * 
   * @return {object} rsponse containing the status of the action
   */

  deleteUser(req, res) {
    if (!isDigit(req.params.groupId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid groupId'
      });
    } else if (!isDigit(req.params.userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId'
      });
    }
    Members.destroy({
      where: {
        groupId: req.params.groupId,
        userId: req.params.userId
      }
    })
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'user deleted from group successfully'
        });
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  },

  /**
   * @description update group details through the route
   *  PUT: /api/v1/groups/:groupId/update
   * 
   * @param  {object} req  request object
   * @param  {object} res  response object
   * 
   * @return {object} rsponse containing the status of the action
   */
  updateGroupInfo(req, res) {
    if (!isDigit(req.params.groupId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid groupId'
      });
    }
    Group.findOne({
      where: {
        id: req.params.groupId
      }
    })
      .then((groupToUpdate) => {
        if (!groupToUpdate) {
          return res.status(404).json({
            success: false,
            message: 'Group not found. Group deleted or does not exist'
          });
        }
        if (groupToUpdate.creator === req.currentUser.currentUser.userName) {
          Group.update({
            name: req.body.name,
            description: req.body.description
          }, {
            where: {
              id: groupToUpdate.id
            }
          })
            .then(() => {
              res.status(200).json({
                success: true,
                message: 'group info updated successfully'
              });
            });
        } else {
          return res.status(401).json({
            success: false,
            message: 'You are not athorize to update the info of this group'
          });
        }
      })
      .catch(() => res.status(500).json({
        success: false,
        message: 'Server error'
      }));
  }
};

export default GroupController;
