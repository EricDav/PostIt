import db from '../models';

const Group = db.Group;
const User = db.User;
// const posts = db.groupPosts;
// const members = db.groupMembers;
/**
 * @param  {object} req request coming from the client
 * @param  {object} res response to the client
 * @description create a group with a name, the name of creator of the group and Description .
 * @return {object} Group
 */
const createGroups = {
  create(req, res) {
    Group
      .findOne({ where: {
        name: req.body.name
      } })
      .then((user) => {
        if (user) {
          return res.status(400).json({
            success: false,
            message: 'name already exist'
          });
        }
        Group
          .create({
            name: req.body.name,
            description: req.body.description,
            creator: req.decoded.user.username
          })
          .then((group) => {
            group.addUser(req.decoded.user.id);
            res.status(201).json({
              success: true,
              message: 'group created successfully'
            });
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  addUser(req, res) {
    return Group
      .findOne({ where: {
        id: req.params.groupId
      } })
      .then((group) => {
        group.addUser(req.body.userId);
        res.status(201).json({
          success: true,
          message: 'user added to group successfully'
        });
      })
      .catch(error => res.status(400).send(error));
  },
  getGroups(req, res) {
    User
      .findOne({ where: {
        id: req.decoded.user.id
      } })
      .then((user) => {
        user.getGroups().then((groups) => {
          if (groups.length === 0) {
            res.status(200).json({
              message: 'You did not belong to any group'
            });
          } else {
            res.status(200).send(groups);
          }
        });
      })
      .catch(error => res.status(400).send(error));
  },
  getGroupMembers(req, res) {
    return Group
      .findOne({ where: {
        id: req.params.groupId
      } })
      .then((group) => {
        group.getUsers()
          .then(groups => res.status(200).send(groups))
          .catch(error => res.status(400).send(error));
      });
  },
  updateGroupInfo(req, res) {
    Group.findOne({
      where: {
        creator: req.decoded.user.username
      }
    }).then((group) => {
      if (!group) {
        return res.status(405).json({
          success: false,
          message: 'You are not athorize to update the info of this group'
        });
      }
      if (group.creator === req.decoded.user.username) {
        Group.update({
          name: req.body.name,
          description: req.body.description
        }, {
          where: {
            id: group.id
          }
        }).then(() => {
          res.status(201).json({
            success: false,
            message: 'group info updated successfully'
          });
        });
      } else {
        return res.status(403).json({
          success: false,
          message: 'You are not athorize to update the info of this group'
        });
      }
    });
  }
};

export default createGroups;