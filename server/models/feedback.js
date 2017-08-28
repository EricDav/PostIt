module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Feedback', {
    Bug: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    recomendation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    generalRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rejections: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return Message;
};
