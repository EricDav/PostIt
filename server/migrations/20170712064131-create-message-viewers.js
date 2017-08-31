module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('messageViewers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      viewerUsername: {
        type: Sequelize.STRING,
        allowNull: false
      },
      seenMessageIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
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
  down: queryInterface => queryInterface.dropTable('messageViewers')
};
