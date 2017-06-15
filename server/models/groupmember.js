module.exports = (sequelize, DataTypes) => {
  const groupMember = sequelize.define('groupMember', {
    memberUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        groupMember.belongsToMany(models.group, {
          foreignKey: 'groupId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return groupMember;
};
