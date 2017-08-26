module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Feedback', {
    Bug: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recomendation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    generalRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rejections: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Message;
};
