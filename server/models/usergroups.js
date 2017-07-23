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
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return UserGroup;
};
