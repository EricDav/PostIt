import jwt from 'jsonwebtoken';
import db from '../models';

const User = db.PostIts;

const logIn = {
  findUser(req, res) {
    return User
      .findOne({ where: { userName: req.body.userName } })
      .then((user) => {
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. wrong username or password. Can not find user' });
        } else if (user.password !== req.body.password) {
          res.json({ success: false, message: 'Authentication failed. wrong username or password. wrong password' });
        } else {
          const token = jwt.sign({ user: user.id }, 'secret'
          );
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
export default logIn;
