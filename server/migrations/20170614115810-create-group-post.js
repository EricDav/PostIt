module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('groupPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      posterUsername: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    }),
  down: queryInterface => queryInterface.dropTable('groupPosts'),
};
