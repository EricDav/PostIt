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
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
    },
  });
  return groupPost;
};
