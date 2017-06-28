import db from '../models';

const groupPost = db.groupPosts;
const createGroupPost = {
  create(req, res) {
    return groupPost
      .create({
        message: req.body.message,
        posterUsername: req.body.posterUsername,
        postId: req.params.postId,
      })
      .then(Groupost => res.status(201).send(Groupost))
      .catch(error => res.status(400).send(error));
  },
};
export default createGroupPost;
