import groupPost from '../models';

groupPost = groupPost.groupPosts;

module.exports = {
  create(req, res) {
    return groupPost
      .create({
        message: req.body.message,
        posterUsername: req.body.posterUsername,
        groupId: req.params.groupId,
      })
      .then(Groupost => res.status(201).send(Groupost))
      .catch(error => res.status(400).send(error));
  },
};
