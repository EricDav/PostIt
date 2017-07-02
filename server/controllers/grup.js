import db from '../models';

const Group = db.groups;
const posts = db.groupPosts;
const members = db.groupMembers;
/**
 * @param  {object} req request coming from the client
 * @param  {object} res response to the client
 * @description create a group with a name, the name of creator of the group and Description .
 * @return {object} Group
 */
const createGroups = {
  create(req, res) {
    return Group
      .create({
        Name: req.body.Name,
        Description: req.body.Description,
        ownerUserName: req.decoded.user.userName,
      })
      .then((grup) => {
        members
          .create({
            groupId: grup.id,
            memberId: req.decoded.user.id
          })
          .then(member => res.status(201).json({
            success: true,
            message: `Group created successfully by a user with ${member.memberId}`
          }))
          .catch(error => res.status(404).send(error));
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
