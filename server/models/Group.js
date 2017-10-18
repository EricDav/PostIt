module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    externalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Group name already exists. Use another name'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  });
  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'UserGroups',
      foreignKey: 'groupId',
    });
    Group.hasMany(models.Message, {
      foreignKey: 'groupId'
    });
  };
  return Group;
};
