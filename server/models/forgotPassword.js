module.exports = (sequelize, DataTypes) => {
  const messageViewer = sequelize.define('forgotPassword', {
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
  messageViewer.associate = (models) => {
    messageViewer.belongsTo(models.User, {
      foreignKey: 'viewerUsername',
      onDelete: 'CASCADE',
    });
  };
  return messageViewer;
};
