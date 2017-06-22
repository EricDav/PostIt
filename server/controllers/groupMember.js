const groupmember = require('../models').groupMembers;

module.exports = {
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
