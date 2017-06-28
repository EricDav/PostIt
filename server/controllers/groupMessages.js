<<<<<<< HEAD
const GrouPost = require('../models').groupPosts;

module.exports = {
  getPosts(req, res) {
    return GrouPost
      .findAll({ where: { postId: req.params.groupId } })
      .then(posts => res.status(201).send(posts))
      .catch(error => res.status(404).send(error));
  }
};
||||||| merged common ancestors
=======
import db from '../models';

const GrouPost = db.groupPosts;

const messages = {
  getPosts(req, res) {
    return GrouPost
      .findAll({ where: { postId: req.params.groupId } })
      .then(posts => res.status(201).send(posts))
      .catch(error => res.status(404).send(error));
  }
};

export default messages;
>>>>>>> test
