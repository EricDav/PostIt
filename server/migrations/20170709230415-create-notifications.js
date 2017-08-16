module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      senderUsername: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
      },
      seen: {
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
  down: queryInterface => queryInterface.dropTable('Notifications')
};
