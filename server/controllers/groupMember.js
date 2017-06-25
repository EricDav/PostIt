import db from '../models';

const groupmember = db.groupMembers;

const createGroupMembers = {
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

export default createGroupMembers;
