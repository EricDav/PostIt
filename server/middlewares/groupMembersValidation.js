import db from '../models';

const users = db.PostIts;
const groups = db.groups;
const groupMembers = db.groupMembers;

const addMembersValidation = {
    isValidUser(req, res, next){
        users
          .findOne({ where: 
              { id: req.body.memberId }
          })
          .then((user) => {
              if (!user) {
                  return res.status(404).json({
                    success: false,
                    message: 'user does not exist'
                  });
              } else {
                  next();
              }
          })
        .catch(error => res.status(404).send(error));
    },

    canAddUserToGroup(req, res, next) {
        groups
          .findOne({
              where: {
                  id: req.params.groupId
              }
          })
          .then((group) => {
              if (!group) {
                  return res.status(404).json({
                    success: false,
                    message: 'Group not found. Group  not created or has been deleted'
              });
        } else {
            next();
        }
    })
    .catch(error => res.status(404).send(error));
  },
  isAmember(req, res, next) {
    let check = false
    groupMembers
      .findAll({where: {
          groupId: req.params.groupId
      }})
      .then((Members) => {
         Members.forEach((member) => {
             if (member.memberId == req.body.memberId) {
                 check = true;
             }
         });
         if(check) {
             res.status(401).json({
                  success: false,
                  message: 'user already a member of the group'
            });
         } else {
             next();
         }
      })
  }
}

export default addMembersValidation;