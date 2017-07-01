import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';

const groupMembers = db.groupMembers;

dotenv.load();
const secret = process.env.secretKey;
const User = db.PostIts;
const groups = db.groups;
/**
 * @param  {object} req
 * @param  {object} res
 * @description create a user with name, username, email and password.
 */

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
  },
  userGroups(req, res) {
    const list = [];
    groupMembers
      .findAll({ where: { memberId: req.params.userId } })
      .then((member) => {
        member.forEach((obj) => {
          list.push(obj.groupId);
        });
        groups
          .findAll({ where: { id: list } })
          .then(Groups => res.status(200).send(Groups))
          .catch(error => res.status(404).send(error));
      })
      .catch(error => res.status(404).send(error));
  }
};

export default createUser;
