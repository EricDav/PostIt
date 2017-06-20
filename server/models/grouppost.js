module.exports = (sequelize, DataTypes) => {
  const groupPost = sequelize.define('groupPosts', {
    posterUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
      // associate: (models) => {
      //   groupPost.belongsToMany(models.group, {
      //     foreignKey: 'groupId',
      //     onDelete: 'CASCADE',
      //   });
      // },
    },
  });
  return groupPost;
};
