import db from '../models';

const Group = db.Group;
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
            creator: req.body.creator
          })
          .then((group) => {
            group.addUser(req.decoded.user.id);
            res.status(201).send(group);
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
  Delete(req, res) {
    return Group
      .destroy({ where: { id: req.params.groupId } })
      .then(() => {
        posts
          .destroy({ where: { postId: req.params.groupId } })
          .then(() => {
            members
              .destroy({ where: { groupId: req.params.groupId } })
              .then(() => res.status(200).json({
                success: true,
                message: 'Deleted group, group messages and group members successfully' }))
              .catch(error => res.status(404).send(error));
          })
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(404).send(error));
  }
};

export default createGroups;
