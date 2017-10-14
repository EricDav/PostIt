module.exports = (sequelize, DataTypes) => {
  const MessageViewer = sequelize.define('MessageViewer', {
    viewerUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    seenMessageIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      unique: false
    }
  });
  return MessageViewer;
};
