const Group = require('../models').groups;

module.exports = {
  create(req, res) {
    return Group
      .create({
        Name: req.body.Name,
        Description: req.body.Description,
        ownerUserName: req.body.ownerUserName,
      })
      .then(grup => res.status(201).send(grup))
      .catch(error => res.status(400).send(error));
  },
};
