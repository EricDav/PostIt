const User = require('../models').PostIts;

console.log(User);
module.exports = {
  create(req, res) {
    return User
      .create({
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
};

