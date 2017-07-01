/**
 * @param  {object} sequelize
 * @param  {object} DataTypes
 * @description creating model for group posts
 * @return {object} group post model
 */
const groupPostModel = (sequelize, DataTypes) => {
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
export default groupPostModel;
