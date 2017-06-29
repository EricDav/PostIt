<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
||||||| merged common ancestors
const User = require('../models').PostIts;
=======
import User from '../models';

User = User.PostIts;
>>>>>>> da9037e389e27eed866f5636f98c4b093c910a1c

<<<<<<< HEAD
dotenv.load();
const secret = process.env.secretKey;
const User = db.PostIts;
/**
 * @param  {object} req
 * @param  {object} res
 * @description create a user with name, username, email and password.
 */
const createUser = {
||||||| merged common ancestors
console.log(User);
module.exports = {
=======
module.exports = {
>>>>>>> da9037e389e27eed866f5636f98c4b093c910a1c
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
  /**
   * @param  {object} req
   * @param  {object} res
   * @description fetch all the users from database
   * @return {array} all users in an array
   */
  allUsers(req, res) {
    return User
      .all()
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  }
};
export default createUser;
