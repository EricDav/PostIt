
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
    active: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false
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
      onDelete: 'CASCADE',
      foreignKey: 'userId',
    });
    User.hasMany(models.Message, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
      as: 'messages',
    });
  };
  return User;
};
