module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('groups', {
    Name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        group.belongsTo(models.PostIts, {
          foreignKey: 'owner',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return group;
};
