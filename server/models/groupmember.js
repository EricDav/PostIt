module.exports = (sequelize, DataTypes) => {
  const groupMember = sequelize.define('groupMembers', {
    memberUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
    },
  });
  return groupMember;
};
