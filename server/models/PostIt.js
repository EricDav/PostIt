/**
 * @param  {object} sequelize
 * @param  {object} DataTypes
 * @description creating model for users
 * @return {object} user model
 */
const UserModel = (sequelize, DataTypes) => {
  const PostIt = sequelize.define('PostIts', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        PostIt.hasMany(models.group, {
          foreingKey: 'owner',
          as: 'groups',
        });
      },
    },
  });
  return PostIt;
};
export default UserModel;
