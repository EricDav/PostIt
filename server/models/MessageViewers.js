module.exports = (sequelize, DataTypes) => {
  const MessageViewer = sequelize.define('messageViewer', {
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
