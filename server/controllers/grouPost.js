import db from '../models';

const groupPost = db.groupPosts;
/**
 * @param  {object} req request coming from the client
 * @param  {object} res response to the client
 * @description create a post to a specify group.
 * @return {object} groupPost
 */
const createGroupPost = {
  create(req, res) {
    return groupPost
      .create({
        message: req.body.message,
        posterUsername: req.decoded.user.userName,
        postId: req.params.groupId
      })
      .then((Groupost) => {
        res.status(201).send(Groupost);
      })
      .catch((error) => {
        res.status(404).send(error);
    })
  }
};
export default createGroupPost;
