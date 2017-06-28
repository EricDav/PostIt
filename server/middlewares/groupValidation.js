import db from '../models';

const Groups = db.groups;
/**
 * @param  {object} req
 * @param  {object} res
 * @param  {} next
 * @description validate for group creation by checking in if group name exist
 * @return {object}
 */
const group = {
  groupValidation(req, res, next) {
    Groups
      .findOne({
        where: {
          Name: req.body.Name
        }
      })
      .then((Group) => {
        if (!Group) {
          next();
        } else {
          return res.status(409).json({
            success: false,
            message: 'group name already exist'
          });
        }
      })
      .catch(error => res.status(404).send(error));
  }
};
export default group;
