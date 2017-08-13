module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'normal',
      validate: {
        isIn: {
          args: [
            ['normal', 'urgent', 'critical']
          ],
          msg: 'normal, urgent or critical Required'
        }
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    senderUsername: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Message.associate = (models) => {
    Message.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE',
    });
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    });
  };
  return Message;
};
