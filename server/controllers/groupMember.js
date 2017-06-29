import db from '../models';

const groupmember = db.groupMembers;
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
        memberUsername: req.body.memberUsername,
      })
      .then(Groupmember => res.status(201).send(Groupmember))
      .catch(error => res.status(400).send(error));
  },
};

export default AddMemberToAGroup;
