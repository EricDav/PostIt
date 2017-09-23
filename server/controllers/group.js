import dataBase from '../models';
import { removePassword } from '../helpers/index';

const Group = dataBase.Group;
const User = dataBase.User;
const Members = dataBase.UserGroup;

/**
 * @description create a group with a name, the name of 
 * creator of the group and Description.
 * 
 * @param  {object} req request coming from the client
 * @param  {object} res response to the client
 * 
 * @return {object} Group
 */
const group = {
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
   *@description It gets all the numbers of new 
   messages in all the groups a user belongs to
   *
   * @param  {object} req
   * @param  {object} res
   * 
   * @return {array} an object with key: group, value: 
   * number of new messages in the group
   */

  getGroups(req, res) {
    User
      .findOne({ where: {
        id: req.currentUser.currentUser.id
      } })
      .then((user) => {
        user.getGroups().then((groups) => {
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
   *@description get all the members of a particular group
   * 
   * @param  {object} req
   * @param  {object} res
   * 
   * @return {array} array of object
   */
  getGroupMembers(req, res) {
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
   * @description delete  a particular group given its Id
   * 
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @return {void} no returns
   */
  deleteGroup(req, res) {
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
   * @description delete a member of a group
   * 
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @return {void} no returns
   */

  deleteUser(req, res) {
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
   * @description update group details
   * 
   * @param  {object} req  request object
   * @param  {object} res  response object
   * @return {void} no returns
   */
  updateGroupInfo(req, res) {
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

export default group;
