
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email address is invalid'
        }
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Phone number already exists'
      }
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
