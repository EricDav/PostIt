module.exports = (sequelize, DataTypes) => {
  const messageViewer = sequelize.define('Notification', {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    senderUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    seen: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: false
    }
  });
  messageViewer.associate = (models) => {
    messageViewer.belongsTo(models.User, {
      foreignKey: 'senderUsername',
      onDelete: 'CASCADE',
    });
  };
  return messageViewer;
};
