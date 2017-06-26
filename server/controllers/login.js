import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';

dotenv.load();
const User = db.PostIts;
const secret = process.env.secretKey;

const logIn = {
  findUser(req, res) {
    return User
      .findOne({ where: { userName: req.body.userName } })
      .then((user) => {
        if (!user) {
          res.status(404).json({ success: false, message: 'Authentication failed. wrong username or password. Can not find user' });
        } else if (user.password !== req.body.password) {
          res.status(404).json({ success: false, message: 'Authentication failed. wrong username or password. wrong password' });
        } else {
          const token = jwt.sign(
            { userId: user.id,
              userName: user.userName
            }, secret
          );
          res.status(201).json({
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
