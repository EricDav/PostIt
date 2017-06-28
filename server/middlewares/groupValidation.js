import db from '../models';

const Groups = db.groups;
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
