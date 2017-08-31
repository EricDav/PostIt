module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('SeenLasts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      seenUsername: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
      },
      seenLast: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
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
  down: queryInterface => queryInterface.dropTable('SeenLasts')
};
