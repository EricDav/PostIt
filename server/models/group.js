
/**
 * @param  {object} sequelize
 * @param  {object} DataTypes
 * @description creating model for group
 * @return {object} group model
 */
const groupModel = (sequelize, DataTypes) => {
  const group = sequelize.define('groups', {
    Name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerUserName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        group.belongsTo(models.PostIt, {
          foreignKey: 'ownerUserName',
          onDelete: 'CASCADE',
        });
        group.hasMany(models.groupMember, {
          foreignKey: 'groupId',
          as: 'groupMembers',
        });
      },
    },
  });
  return group;
};

export default groupModel;
