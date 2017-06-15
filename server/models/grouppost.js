module.exports = (sequelize, DataTypes) => {
  const groupPost = sequelize.define('groupPost', {
    posterUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        groupPost.belongsToMany(models.group, {
          foreignKey: 'postId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return groupPost;
};
