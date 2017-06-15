const user = require('../models/');

module.export = {
  create(req, res) {
    return user
      .create({
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
};
