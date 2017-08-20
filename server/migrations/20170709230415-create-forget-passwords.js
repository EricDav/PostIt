module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('forgotPasswords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      generatedNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      verified: {
        type: Sequelize.BOOLEAN,
        default: false

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('forgotPasswords')
};
