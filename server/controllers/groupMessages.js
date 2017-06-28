import db from '../models';

const GrouPost = db.groupPosts;
/**
 * @param  {object} req request coming from the client
 * @param  {object} res response to the client
 * @description get all posts that belong to a specify group.
 * @return {object} 
 */
const messages = {
  getPosts(req, res) {
    return GrouPost
      .findAll({ where: { postId: req.params.groupId } })
      .then(posts => res.status(201).send(posts))
      .catch(error => res.status(404).send(error));
  }
};

export default messages;
