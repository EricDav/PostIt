
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'This email address is invalid'
        }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This username already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: 'UserGroups',
      foreignKey: 'userId',
    });
    User.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'messages',
    });
  };
  return User;
};
