import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';

dotenv.load();
const User = db.User;
const secret = process.env.secretKey;
/**
 * @param  {object} req
 * @param  {object} res
 * @description Auntheticate user.
 * @return {object} user information
 */
const logIn = {
  findUser(req, res) {
    return User
      .findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ success: false, message: 'Authentication failed. wrong username or password.' });
        } else if (user.password !== req.body.password) {
          return res.status(401).json({ success: false, message: 'Authentication failed. wrong username or password.' });
        }
        const token = jwt.sign(
          { user
          }, secret
        );
        res.status(200).json({
          success: true,
          message: 'Token generated successfully',
          Token: token,
        });
      })
      .catch(error => res.status(404).send(error));
  },
};
export default logIn;
