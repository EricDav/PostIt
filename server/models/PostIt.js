module.exports = (sequelize, DataTypes) => {
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
          foreingKey: 'ownerUserName',
          as: 'group',
        });
      },
    },
  });
  return PostIt;
};
