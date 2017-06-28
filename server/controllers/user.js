import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';

dotenv.load();
const secret = process.env.secretKey;
const User = db.PostIts;
const createUser = {
  create(req, res) {
    return User
      .create({
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
      })
      .then((user) => {
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
      })
      .catch(error => res.status(400).send(error));
  },
  allUsers(req, res) {
    return User
      .all()
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  }
};
<<<<<<< HEAD

||||||| merged common ancestors
=======
export default createUser;
>>>>>>> test
