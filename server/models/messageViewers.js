module.exports = (sequelize, DataTypes) => {
  const messageViewer = sequelize.define('messageViewer', {
    viewerUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    seenMessageIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      unique: false
    },
    seenLast: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
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
