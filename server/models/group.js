module.exports = (sequelize, DataTypes) => {
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
  }, {
    classMethods: {
      associate: (models) => {
        group.belongsToMany(models.PostIt, {
          foreignKey: 'ownerUserName',
          onDelete: 'CASCADE',
        });
        group.hasMany(models.groupMembers, {
          foreignKey: 'groupId',
          as: 'groupMembers',
        });
        group.hasMany(models.groupPost, {
          foreignKey: 'postId',
          as: 'groupPost',
        });
      },
    },
  });
  return group;
};
