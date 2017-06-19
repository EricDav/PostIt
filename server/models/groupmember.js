module.exports = (sequelize, DataTypes) => {
  const groupMember = sequelize.define('groupMembers', {
    memberUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        groupMember.belongsTo(models.group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return groupMember;
};
