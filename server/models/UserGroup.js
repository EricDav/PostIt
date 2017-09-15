module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
  });
  return UserGroup;
};
