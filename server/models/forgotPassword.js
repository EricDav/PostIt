module.exports = (sequelize, DataTypes) => {
  const forgotPassword = sequelize.define('forgotPassword', {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    generatedNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      default: false

    }
  });
  forgotPassword.associate = (models) => {
    forgotPassword.belongsTo(models.User, {
      foreignKey: 'viewerUsername',
      onDelete: 'CASCADE',
    });
  };
  return forgotPassword;
};
