/**
 * @param  {object} sequelize
 * @param  {object} DataTypes
 * @description creating model for group members
 * @return {object} group members model
 */
const groupmemberModel = (sequelize, DataTypes) => {
  const groupMember = sequelize.define('groupMembers', {
    memberUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
    },
  });
  return groupMember;
};
export default groupmemberModel;
