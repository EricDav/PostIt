import db from '../models';

const groupmember = db.groupMembers;
const User = db.PostIts;
/**
 * @param  {object} req request coming from the client
 * @param  {object} res response to the client
 * @description Adds a member to a specify group.
 * @return {object}
 */
const AddMemberToAGroup = {
  create(req, res) {
    return groupmember
      .create({
        groupId: req.params.groupId,
        memberId: req.body.memberId,
      })
      .then(Groupmember => res.status(201).send(Groupmember))
      .catch(error => res.status(400).send(error));
  },
  getGroupmMembers(req, res) {
    const listOfIdsOfMembers = [];
    return groupmember
      .findAll({ where: { groupId: req.params.groupId } })
      .then((Groupmembers) => {
        Groupmembers.forEach((users) => {
          listOfIdsOfMembers.push(users.memberId);
        });
        User
          .findAll({ where: { id: listOfIdsOfMembers } })
          .then(groupUsers => res.status(201).send(groupUsers))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};

export default AddMemberToAGroup;
