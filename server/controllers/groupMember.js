const groupmember = require('../models').groupMembers;

module.exports = {
  create(req, res) {
    return groupmember
      .create({
        memberUsername: req.body.memberUsername,
        groupId: req.params.groupId,
      })
      .then(Groupmember => res.status(201).send(Groupmember))
      .catch(error => res.status(400).send(error));
  },
};
