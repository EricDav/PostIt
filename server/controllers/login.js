const jwt = require('jsonwebtoken');
const User = require('../models').PostIts;

console.log(jwt);

module.exports = {
  findUser(req, res, next) {
    return User
      .findOne({ where: { userName: req.body.userName } })
      .then((user) => {
        if (user === null) {
          res.json({ success: false, message: 'Authentication failed. wrong username or password. Can not find user' });
        } else if (user.password !== req.body.password) {
          res.json({ success: false, message: 'Authentication failed. wrong username or password. wrong password' });
        } else {
            console.log('yes');
          const token = jwt.sign({ user: user.id }, 'secret'
          );
          console.log(token);
          res.json({
            success: true,
            message: 'Token generated successfully',
            Token: token
          });
        }
      })
      .catch(error => res.status(400).send(error));
  },
};
