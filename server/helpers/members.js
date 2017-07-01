import db from '../models';

const groupMembers = db.groupMembers;
const members = (req, res) => {
  const list = [];
  groupMembers
    .findAll({ where: { memberUsername: req.body.userName } })
    .then((member) => {
      member.forEach((obj) => {
        list.push(obj.groupId);
      });
      groups
        .findAll({ where: { id: list } })
        .then((Groups) => {
          res.status(404).send(Groups);
        })
        .catch(error => res.status(404).send(error));
    })
    .catch(error => res.status(404).send(error));
};
export default members;
