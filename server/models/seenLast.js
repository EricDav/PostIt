module.exports = (sequelize, DataTypes) => {
  const SeenLast = sequelize.define('SeenLast', {
    seenUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    seenLast: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
  });
  SeenLast.associate = (models) => {
    SeenLast.belongsTo(models.User, {
      foreignKey: 'seenUsername',
      onDelete: 'CASCADE',
    });
  };
  return SeenLast;
};
